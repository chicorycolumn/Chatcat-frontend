import panelStyles from "./css/Panel.module.css";
import g from "./css/Generic.module.css";
import styles from "./css/InvitePanel.module.css";
import s from "./css/s.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";
import browserUtils from "./utils/browserUtils.js";

const copyText = (id) => {
  const element = document.getElementById(id);
  let textToCopy = element.value || element.textContent;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      element.value = "Copied!";
      element.textContent = "Copied!";

      setTimeout(() => {
        element.value = textToCopy;
        element.textContent = textToCopy;
        element.select();
        element.setSelectionRange(0, 99999);
      }, 500);
    })
    .catch((error) => {
      console.log(`Sorry, failed to copy text. ${error}`);
      // alert(`Sorry, failed to copy text. ${error}`);
    });
};

export default function InvitePanel(props) {
  console.log("((InvitePanel))");

  let rpw = browserUtils.getCookie("roomPassword");

  const [roomPassword, setRoomPassword] = useState(rpw && rpw.split("-")[0]);

  useEffect(() => {
    setTimeout(() => {
      copyText("currentUrl");
    }, 200);
  }, []);

  return (
    <div
      className={`${g.box1} ${panelStyles.panelSize2a} ${panelStyles.panelColorB1a}`}
    >
      <button
        onClick={(e) => {
          props.setShowInvitePanel(false);
        }}
        className={`${panelStyles.exitButton1}`}
      >
        &times;
      </button>
      <div className={`${panelStyles.innerBox1}`}>
        <div className={`${styles.box1}`}>
          <h4 className={`${g.noselect} ${panelStyles.title1}`}>
            Share this url with your friends
          </h4>
          <div className={`${styles.box2}`}>
            <textarea
              className={`${styles.pseudoInput2}`}
              type="text"
              value={
                window.location.href && window.location.href.split("http://")[1]
              }
              id="currentUrl"
            />
            <button
              className={`${panelStyles.copyButton}`}
              onClick={() => {
                copyText("currentUrl");
              }}
            >
              📋
            </button>
          </div>
        </div>
        <div className={`${styles.box1}`}>
          <h4 className={`${g.noselect} ${panelStyles.title1}`}>
            Room is password protected
          </h4>
          <div className={`${styles.box2}`}>
            <button
              className={`${panelStyles.copyButton}`}
              onClick={() => {
                let newRoomPassword = roomUtils.fourLetterWord(roomPassword);

                setRoomPassword(newRoomPassword);

                props.socket.emit("Update room password", {
                  roomName: props.successfullyEnteredRoomName,
                  roomPassword: newRoomPassword,
                });
              }}
            >
              🆕
            </button>
            <textarea
              className={`${styles.pseudoInput}`}
              type="text"
              value={roomPassword}
              id="currentPassword"
            />
            <button
              className={`${panelStyles.copyButton}`}
              onClick={() => {
                copyText("currentPassword");
              }}
            >
              📋
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
