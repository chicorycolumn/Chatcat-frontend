import styles from "./css/Chatbox.module.css";
import genericStyles from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import { scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";

export default function Room(props) {
  let [chatArray, setChatArray] = useState([]);
  let [chatMsg, setChatMsg] = useState("");

  function sendChat() {
    if (chatMsg) {
      props.socket.emit("Chat message", { chatMsg: chatMsg });
      setChatMsg("");
    }
  }

  function addToChatArray(chatItem) {
    let newChatArray = chatArray.slice(0);
    newChatArray.push(chatItem);
    setChatArray(newChatArray);
  }

  if (props.socket && props.socketNudge) {
    props.socket.on("Chat message", function (data) {
      addToChatArray([data.sender.playerName, data.chatMsg]);
    });

    props.socket.on("Player entered your room", function (data) {
      addToChatArray(`${data.player.playerName} entered the room`);
    });

    props.socket.on("Player left your room", function (data) {
      addToChatArray(`${data.player.playerName} left the room`);
    });
  }

  return (
    <div className={`${genericStyles.genericBox1} ${styles.chatbox}`}>
      <h1>Chatbox</h1>
      <div className={`${styles.innerChatbox1}`}>
        {chatArray.map((chatItem) => {
          return typeof chatItem === "string" ? (
            <div className={`${styles.chatItem}`}>
              <p className={`${styles.chatAnnouncement}`}>{chatItem}</p>
            </div>
          ) : (
            <div className={`${styles.chatItem}`}>
              <p className={`${styles.chatName}`}>{chatItem[0]} says</p>
              <p className={`${styles.chatDialogue}`}>{chatItem[1]}</p>
            </div>
          );
        })}
      </div>
      <form className={`${styles.innerChatbox2}`}>
        <textarea
          className={`${styles.chatboxInput}`}
          value={chatMsg}
          maxLength="60"
          type="text"
          onChange={(e) => {
            setChatMsg(e.target.value);
          }}
        ></textarea>
        <button
          className={`${styles.sendButton}`}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            sendChat();
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}