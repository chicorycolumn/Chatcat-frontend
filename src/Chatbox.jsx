import styles from "./css/Chatbox.module.css";
import genStyles from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import { scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";
import displayUtils from "./utils/displayUtils.js";
import $ from "jquery";

export default function Chatbox(props) {
  console.log("((Chatbox))");

  let [chatArray, setChatArray] = useState([]);
  let [chatMsg, setChatMsg] = useState("");

  useEffect(() => {
    console.log("~~Chatbox~~");

    $("#chatboxInput").on("keypress", function (e) {
      console.log("$");
      if ((e.which === 13 || e.keyCode === 13) && !e.shiftKey) {
        e.preventDefault();
        $("#chatboxSendButton").click();
      }
    });

    if (props.socket) {
      props.socket.on("Chat message", function (data) {
        addToChatArray([data.sender.playerName, data.chatMsg]);
      });

      props.socket.on("Player entered your room", function (data) {
        console.log("Ø player entered --CHATBOX");
        addToChatArray(`${data.player.playerName} entered`);
      });

      props.socket.on("Player left your room", function (data) {
        addToChatArray(`${data.player.playerName} has left`);
      });
    }
    function addToChatArray(chatItem) {
      console.log(`addToChatArray called for ${chatItem}`);
      console.log({ chatArray, chatItem });
      let newChatArray = chatArray.slice(0, 50);
      newChatArray.push(chatItem);
      setChatArray(newChatArray);
      displayUtils.updateScroll("chatOutputContainer");
    }
    return function cleanup() {
      console.log("##Chatbox##");
      props.socket.off("Chat message");
      $("#chatboxInput").off("keypress");
    };
  }, [props.socket, chatArray]);

  function sendChat() {
    console.log("sendChat fxn");
    if (chatMsg) {
      props.socket.emit("Chat message", { chatMsg: chatMsg });
      setChatMsg("");
    }
  }

  return (
    <div className={`${genStyles.box1} ${styles.chatboxSuper}`}>
      <h2>Chatbox</h2>
      <div
        id="chatOutputContainer"
        className={`${genStyles.minipanel1} ${styles.chatOutputContainer}`}
      >
        {chatArray.map((chatItem) => {
          return typeof chatItem === "string" ? (
            <div className={`${styles.chatItem}`}>
              <p className={`${styles.chatAnnouncement}`}>{chatItem}</p>
            </div>
          ) : (
            <div className={`${styles.chatItem}`}>
              <p className={`${styles.chatName}`}>{chatItem[0]}:</p>
              <p className={`${styles.chatDialogue}`}>{chatItem[1]}</p>
            </div>
          );
        })}
      </div>
      <form className={`${styles.chatInputContainer}`}>
        <textarea
          id="chatboxInput"
          className={`${styles.chatboxInput}`}
          value={chatMsg}
          maxLength="60"
          type="text"
          onChange={(e) => {
            setChatMsg(e.target.value);
          }}
        ></textarea>
        <button
          id="chatboxSendButton"
          className={`${styles.sendButton}`}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log("chatboxSendButton clicked");
            sendChat();
          }}
        >
          SEND
        </button>
      </form>
    </div>
  );
}
