import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";
import browserUtils from "./utils/browserUtils.js";
import displayUtils from "./utils/displayUtils.js";
import gameUtils from "./utils/gameUtils.js";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/InvitePanel.module.css";
import PlayerList from "./PlayerList.jsx";

const copyText = (inputId) => {
  let titleId = `${inputId[0]}Title`;
  const inputEl = document.getElementById(inputId);
  const titleEl = document.getElementById(titleId);

  let textToCopy = inputEl.value || inputEl.textContent;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      titleEl.innerText = "Copied!";

      inputEl.select();
      inputEl.setSelectionRange(0, 99999);
      setTimeout(() => {
        titleEl.innerText = {
          p: "Room is password protected",
          u: "Share this url with your friends",
        }[inputId[0]];
      }, 850);
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
    $(document).on("click", function () {
      if (
        !(
          $("#InvitePanel").is(":focus") ||
          $("#InvitePanel").find(":focus").length
        )
      ) {
        props.setShowInvitePanel(false);
      }
    });

    setTimeout(() => {
      copyText("uInput");
    }, 350);

    return function cleanup() {
      $(document).off("click");
    };
  }, []);

  return (
    <div
      tabindex="0"
      id="InvitePanel"
      className={`${g.box1} ${panelStyles.panelSize2a} ${panelStyles.panelColorB1a} ${s.noOutline}`}
    >
      <button
        onClick={(e) => {
          props.setShowInvitePanel(false);
        }}
        className={`${panelStyles.exitButton} ${panelStyles.exitButtonBlue}`}
      >
        &times;
      </button>
      <div className={`${panelStyles.innerBox1}`}>
        <div className={`${styles.box1}`}>
          <h4 id="uTitle" className={`${s.noSelect} ${panelStyles.title1}`}>
            Share this url with your friends
          </h4>
          <div className={`${styles.box2a}`}>
            <textarea
              className={`${styles.pseudoInput1}`}
              type="text"
              value={
                window.location.href && window.location.href.split("http://")[1]
              }
              id="uInput"
            />
            <button
              className={`${panelStyles.littleButtonRight}`}
              onClick={() => {
                copyText("uInput");
              }}
            >
              📋
            </button>
          </div>
        </div>
        <div className={`${styles.box1}`}>
          <h4 id="pTitle" className={`${s.noSelect} ${panelStyles.title1}`}>
            Room is password protected
          </h4>
          <div className={`${styles.box2}`}>
            <button
              disabled={!props.playerData.isRoomboss}
              className={`${panelStyles.littleButtonLeft}`}
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
              className={`${styles.pseudoInput2}`}
              type="text"
              value={roomPassword}
              id="pInput"
            />
            <button
              className={`${panelStyles.littleButtonRight}`}
              onClick={() => {
                copyText("pInput");
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
