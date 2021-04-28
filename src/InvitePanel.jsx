import panelStyles from "./css/Panel.module.css";
import genStyles from "./css/Generic.module.css";
import styles from "./css/InvitePanel.module.css";
import s from "./css/s.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";

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
      // alert(`Sorry, failed to copy text. ${error}`);
    });
};

export default function InvitePanel(props) {
  console.log("((InvitePanel))");

  useEffect(() => {
    setTimeout(() => {
      copyText("currentUrl");
    }, 200);
  }, []);

  return (
    <div
      className={`${genStyles.box1} ${panelStyles.panelSize2} ${panelStyles.panelColorB1} ${s.absoluteCentered}`}
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
          <h4 className={`${genStyles.noselect} ${panelStyles.title1}`}>
            Share this url with your friends
          </h4>
          <div className={`${styles.box2}`}>
            <textarea
              className={`${styles.pseudoInput}`}
              type="text"
              value={window.location.href}
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
          <h4 className={`${genStyles.noselect} ${panelStyles.title1}`}>
            Password
          </h4>
          <div className={`${styles.box2}`}>
            <textarea
              className={`${styles.pseudoInput}`}
              type="text"
              value="ABCD"
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
