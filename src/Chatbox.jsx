import styles from "./css/Chatbox.module.css";
import g from "./css/Generic.module.css";
import s from "./css/s.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import displayUtils from "./utils/displayUtils.js";
import $ from "jquery";
import PlayerList from "./PlayerList";

export default function Chatbox(props) {
  console.log("((Chatbox))");

  let [chatArray, setChatArray] = useState([]);
  let [chatMsg, setChatMsg] = useState("");

  useEffect(() => {
    console.log("~~Chatbox~~");

    $("#chatboxInput_Chatbox").on("keypress", function (e) {
      if ((e.which === 13 || e.keyCode === 13) && !e.shiftKey) {
        e.preventDefault();
        $("#chatboxSendButton_Chatbox").click();
      }
    });

    if (props.socket) {
      props.socket.on("Chat message", function (data) {
        addToChatArray([data.sender.playerName, data.chatMsg]);
      });

      props.socket.on("Player entered your room", function (data) {
        addToChatArray(`${data.player.playerName} entered`);
      });

      props.socket.on("Player left your room", function (data) {
        if (data.player.truePlayerName === props.playerData.truePlayerName) {
          navigate("/");
          alert(
            `You're being booted from this room. Perhaps you entered this room in another window and then closed it?`
          );
        }
        addToChatArray(`${data.player.playerName} has left`);
      });
    }
    function addToChatArray(chatItem) {
      let newChatArray = chatArray.slice(chatArray.length - 50);
      newChatArray.push(chatItem);
      setChatArray(newChatArray);
      displayUtils.updateScroll("chatOutputContainer");
    }
    return function cleanup() {
      console.log("##Chatbox##");
      props.socket.off("Chat message");
      $("#chatboxInput_Chatbox").off("keypress");
    };
  }, [props.socket, chatArray]);

  function sendChat() {
    if (!chatMsg) {
      return;
    }

    if (chatMsg.slice(0, 5).toLowerCase() === "star ") {
      let playerNameToStar = chatMsg.split(" ")[1];
      if (
        props.playerList.find(
          (player) => player.playerName === playerNameToStar
        )
      ) {
        props.socket.emit("Give stars", {
          playerNameToStar,
          starIncrement: 1,
        });
        setChatMsg("");
        return;
      }
    }

    props.socket.emit("Chat message", { chatMsg: chatMsg });
    setChatMsg("");
  }

  return (
    <div className={`${g.box1} ${styles.chatboxSuper}`}>
      <h2>Chatbox: You are {props.playerData.playerName}</h2>
      <div
        id="chatOutputContainer"
        className={`${g.minipanel1} ${s.overflowScroll} ${styles.chatOutputContainer}`}
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
          id="chatboxInput_Chatbox"
          className={`${styles.chatboxInput}`}
          value={chatMsg}
          maxLength="60"
          type="text"
          onChange={(e) => {
            setChatMsg(e.target.value);
          }}
        ></textarea>
        <button
          id="chatboxSendButton_Chatbox"
          className={`${styles.sendButton}`}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            sendChat();
          }}
        >
          SEND
        </button>
      </form>
    </div>
  );
}
