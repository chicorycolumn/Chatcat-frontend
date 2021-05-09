import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import a from "./css/Animations.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/InvitePanel.module.css";
import PlayerList from "./PlayerList.jsx";

import * as roomUtils from "./utils/roomUtils.js";
import * as browserUtils from "./utils/browserUtils.js";
import * as displayUtils from "./utils/displayUtils.js";
import * as gameUtils from "./utils/gameUtils.js";

const copyText = (inputId) => {
  let titleId = `${inputId[0]}Title`;
  const inputEl = document.getElementById(inputId);
  const titleEl = document.getElementById(titleId);

  let textToCopy = inputEl.textContent;

  console.log(textToCopy);

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      $(`#${inputId}`).css({ color: "var(--pBlue)" });
      $(`#${titleId}`).css({ color: "var(--pBlue)" });
      titleEl.innerText = "Copied!";

      setTimeout(() => {
        $(`#${inputId}`).css({ color: "var(--pBlue_D3)" });
        $(`#${titleId}`).css({ color: "var(--pBlue_D3)" });
        titleEl.innerText = {
          p: "Room is password protected",
          u: "Share this url with your friends",
        }[inputId[0]];
      }, 450);
    })
    .catch((error) => {
      console.log(`Sorry, failed to copy text. ${error}`);
    });
};

export default function InvitePanel(props) {
  console.log("((InvitePanel))");

  let rpw = browserUtils.getCookie("roomPassword");

  const [roomPassword, setRoomPassword] = useState(rpw && rpw.split("-")[0]);

  useEffect(() => {
    displayUtils.splash(a, ["#copyButtonP", "#copyButtonU", "#newButton"], 1);

    console.log("window.location.href", window.location.href);
    console.log("document.URL", document.URL);

    setTimeout(() => {
      if (window.location.href.toString()) {
        console.log("clause1");
        $("#uInput").text(window.location.href.toString().split("http://")[1]);
      } else if (document.URL.toString()) {
        console.log("clause2");
        $("#uInput").text(document.URL.toString().split("http://")[1]);
      }
    }, 2000);

    $(document).on("click.InvitePanel", () => {
      displayUtils.clickOutsideToClose(
        "#InvitePanel",
        props.setShowInvitePanel
      );
    });

    return function cleanup() {
      $(document).off("click.InvitePanel");
    };
  }, []);

  return (
    <div
      tabIndex="0"
      id="InvitePanel"
      className={`${g.boxStyle1} ${panelStyles.mediumLandscapePanel} ${panelStyles.panelBlue2} ${s.noOutline}`}
    >
      <button
        onClick={(e) => {
          props.setShowInvitePanel(false);
        }}
        className={`${panelStyles.exitButton} ${panelStyles.exitButtonBlue}`}
      >
        &times;
      </button>
      <div className={`${styles.box}`}>
        <h4 id="uTitle" className={`${s.noSelect} ${panelStyles.title2}`}>
          Share this url with your friends
        </h4>
        <div className={`${styles.inputContainer2}`}>
          <div className={`${styles.inviteInputBox} ${styles.inviteInputBox1}`}>
            <p
              id="uInput"
              className={`${styles.inputText} ${s.noMargin} ${s.noPadding}`}
            >
              {window.location.href.toString() &&
                window.location.href.toString().split("http://")[1]}
            </p>
          </div>
          <button
            id="copyButtonU"
            className={`${panelStyles.copyButton} ${panelStyles.copyButtonRight}`}
            onClick={() => {
              copyText("uInput");
            }}
          >
            📋
          </button>
        </div>
      </div>
      <div className={`${styles.box}`}>
        <h4 id="pTitle" className={`${s.noSelect} ${panelStyles.title2}`}>
          Room is password protected
        </h4>
        <div className={`${styles.inputContainer1}`}>
          <button
            id="newButton"
            disabled={!props.playerData.isRoomboss}
            className={`${panelStyles.copyButton} ${panelStyles.copyButtonLeft}`}
            onClick={() => {
              let newRoomPassword = roomUtils.fourLetterWord(roomPassword);

              setRoomPassword(newRoomPassword);

              props.socket.emit("Update room password", {
                roomName: props.successfullyEnteredRoomName,
                roomPassword: newRoomPassword,
              });
            }}
          >
            🔄
          </button>
          <div className={`${styles.inviteInputBox} ${styles.inviteInputBox2}`}>
            <p
              id="pInput"
              className={`${styles.inputText} ${s.noMargin} ${s.noPadding}`}
            >
              {roomPassword}
            </p>
          </div>
          <button
            id="copyButtonP"
            className={`${panelStyles.copyButton} ${panelStyles.copyButtonRight}`}
            onClick={() => {
              copyText("pInput");
            }}
          >
            📋
          </button>
        </div>
      </div>
    </div>
  );
}
