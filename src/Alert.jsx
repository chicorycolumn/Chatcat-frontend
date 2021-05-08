import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/Alert.module.css";
import alertimage from "./images/witchcat_sad_exclam.png";

import roomUtils from "./utils/roomUtils.js";
import browserUtils from "./utils/browserUtils.js";
import displayUtils from "./utils/displayUtils.js";
import gameUtils from "./utils/gameUtils.js";

export default function Alert(props) {
  console.log("((Alert))");

  useEffect(() => {
    $(document).on("keydown.Alert", (e) => {
      displayUtils.keydownToClose(e, props.setShowAlert, "Alert");
    });

    $(document).on("click.Alert", () => {
      displayUtils.clickOutsideToClose("#Alert", props.setShowAlert);
    });

    return function cleanup() {
      $(document).off("keydown.Alert");
      $(document).off("click.Alert");
    };
  }, []);

  return (
    <div
      tabindex="0"
      id="Alert"
      className={`${g.boxStyle1} ${panelStyles.smallLandscapePanel} ${panelStyles.panelPink2} ${s.noOutline} ${s.posRel}`}
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
