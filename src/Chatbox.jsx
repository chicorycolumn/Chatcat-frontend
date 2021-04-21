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

  if (props.socket) {
    props.socket.on("Chat message", function (data) {
      let newChatArray = chatArray.slice(0);
      newChatArray.push([data.sender.playerName, data.chatMsg]);
      setChatArray(newChatArray);
    });
  }

  return (
    <div className={`${genericStyles.genericBox1} ${styles.chatbox}`}>
      <h1>Chatbox</h1>
      <div className={`${styles.innerChatbox1}`}>
        {chatArray.map((chatItem) => {
          return (
            <div className={`${styles.chatItem}`}>
              <p className={`${styles.chatItemPlayerName}`}>
                {chatItem[0]} says
              </p>
              <p className={`${styles.chatItemText}`}>{chatItem[1]}</p>
            </div>
          );
        })}
      </div>
      <div className={`${styles.innerChatbox2}`}>
        <textarea
          className={`${styles.chatboxInput}`}
          value={chatMsg}
          onChange={(e) => {
            setChatMsg(e.target.value);
          }}
        ></textarea>
        <button
          className={`${styles.sendButton}`}
          onClick={(e) => {
            e.preventDefault();
            sendChat();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
