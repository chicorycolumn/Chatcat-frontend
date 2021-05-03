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
import styles from "./css/Alert.module.css";

import alertimage from "./images/witchcat_sad_exclam.png";

export default function Alert(props) {
  console.log("((Alert))");

  useEffect(() => {
    function JQF_clickOutsideToClose() {
      if (!($("#Alert").is(":focus") || $("#Alert").find(":focus").length)) {
        props.setShowAlert(false);
      }
    }

    function JQF_keypressToClose(e) {
      console.log("Alert:JQF_keypressToClose", e.keyCode, e.which);

      let exitKeyCodes = [13, 27, 32];

      if (exitKeyCodes.includes(e.keyCode) || exitKeyCodes.includes(e.which)) {
        props.setShowAlert(false);
      }
    }

    $(document).on("keypress", (e) => {
      JQF_keypressToClose(e);
    });

    $(document).on("click", JQF_clickOutsideToClose);

    return function cleanup() {
      $(document).off("click", JQF_clickOutsideToClose);
      $(document).off("keypress", (e) => {
        JQF_keypressToClose(e);
      });
    };
  }, []);

  return (
    <div
      tabindex="0"
      id="Alert"
      className={`${g.box1} ${panelStyles.smallLandscapePanel} ${panelStyles.panelPink2} ${s.noOutline} ${s.posRel}`}
    >
      <img src={alertimage} className={`${styles.bg_img}`} />
      <button
        onClick={(e) => {
          props.setShowAlert(false);
        }}
        className={`${panelStyles.exitButton} ${panelStyles.exitButtonPink}`}
      >
        &times;
      </button>
      <p className={`${styles.alertText}`}> {props.showAlert}</p>
    </div>
  );
}
