import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import a from "./css/Animations.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/Navpanel.module.css";
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

export default function InviteNavpanel(props) {
  console.log("((InviteNavpanel))");

  let rpw = browserUtils.getCookie("roomPassword");

  const [roomPassword, setRoomPassword] = useState(rpw && rpw.split("-")[0]);

  useEffect(() => {
    displayUtils.splash(a, ["#copyButtonP", "#copyButtonU", "#newButton"], 1);

    function updatePasswordInput() {
      setTimeout(() => {
        setRoomPassword(browserUtils.getCookie("roomPassword").split("-")[0]);
      }, 50);
    }

    props.socket.on("Room password updated", updatePasswordInput);

    $(document).on("click.InviteNavpanel", () => {
      displayUtils.clickOutsideToClose(
        "#InviteNavpanel",
        props.setShowInviteNavpanel
      );
    });

    return function cleanup() {
      $(document).off("click.InviteNavpanel");
      props.socket.off("Room password updated", updatePasswordInput);
    };
  }, []);

  return (
    <div
      tabIndex="0"
      id="InviteNavpanel"
      className={`${g.boxStyle1} ${panelStyles.mediumLandscapePanel} ${panelStyles.panelBlue2} ${s.noOutline}`}
    >
      <button
        onClick={(e) => {
          props.setShowInviteNavpanel(false);
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
              {window.location.href && window.location.href.split("//")[1]}
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
              props.socket.emit("Update room password", {
                roomName: props.successfullyEnteredRoomName,
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