import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/Chatbox.module.css";
import roomStyles from "./css/Room.module.css";

import PlayerList from "./PlayerList";

import roomUtils from "./utils/roomUtils.js";
import browserUtils from "./utils/browserUtils.js";
import displayUtils from "./utils/displayUtils.js";
import gameUtils from "./utils/gameUtils.js";

export default function Chatbox(props) {
  console.log("((Chatbox))");

  let [chatArray, setChatArray] = useState([]);
  let [chatMsg, setChatMsg] = useState("");

  useEffect(() => {
    console.log("~~Chatbox~~");

    displayUtils.addListenerForKeydownEnterToSend(
      "#chatboxInput_Chatbox",
      "#chatboxSendButton_Chatbox"
    );

    function SH_playerEntered(data) {
      console.log(333);
      addToChatArray(`${data.player.playerName} entered`);
    }
    function SH_playerLeft(data) {
      if (data.isBoot) {
        addToChatArray(
          `${data.player.playerName} was booted`,
          `The password has changed`
        );
      } else {
        addToChatArray(`${data.player.playerName} has left`);
      }
    }

    if (props.socket) {
      props.socket.on("Player entered your room", SH_playerEntered);
      props.socket.on("Player left your room", SH_playerLeft);
      props.socket.on("Chat message", function (data) {
        addToChatArray([data.sender.playerName, data.chatMsg]);
      });
    }
    function addToChatArray(...chatItems) {
      let newChatArray = chatArray.slice(chatArray.length - 50);

      chatItems.forEach((chatItem) => {
        newChatArray.push(chatItem);
      });

      setChatArray(newChatArray);
      displayUtils.updateScroll("chatOutputContainer");
    }
    return function cleanup() {
      console.log("##Chatbox##");
      props.socket.off("Player entered your room", SH_playerEntered);
      props.socket.off("Player left your room", SH_playerLeft);
      props.socket.off("Chat message");
      $("#chatboxInput_Chatbox").off("keydown");
    };
  }, [props.socket, chatArray]);

  function sendChat() {
    if (!chatMsg) {
      console.log("No chat message");
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
    <div className={`${g.boxStyle1} ${styles.chatboxSuper}`}>
      <h2 className={`${roomStyles.roomHeaders}`}>
        Chatbox: You are {props.playerData.playerName}
      </h2>
      <div
        id="chatOutputContainer"
        className={`${s.overflowScroll} ${styles.chatOutputContainer}`}
      >
        {chatArray.map((chatItem) => {
          return typeof chatItem === "string" ? (
            <div className={`${styles.chatItem}`}>
              <p className={`${styles.chatAnnouncement}`}>{chatItem}</p>
            </div>
          ) : (
            <div className={`${styles.chatItem}`}>
              <p
                className={`${styles.chatName}
              ${s.overflowSplit}
              `}
              >
                {chatItem[0]}
              </p>
              <p className={`${styles.chatDialogue} ${s.overflowSplit}`}>
                {chatItem[1]}
              </p>
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
          disabled={!chatMsg.length}
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
