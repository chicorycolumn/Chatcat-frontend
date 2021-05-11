import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import a from "./css/Animations.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/Alert.module.css";
import sadImage from "./images/witchcat_sad_exclam.png";
import happyImage from "./images/witchcat_happy.png";

import * as roomUtils from "./utils/roomUtils.js";
import * as browserUtils from "./utils/browserUtils.js";
import * as displayUtils from "./utils/displayUtils.js";
import * as gameUtils from "./utils/gameUtils.js";

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
    <>
      {props.showAlert.emotion === "sad" && (
        <div
          tabIndex="0"
          id="Alert"
          className={`${g.boxStyle1} ${panelStyles.smallLandscapePanel} ${panelStyles.panelPink1} ${s.noOutline} ${s.posRel}`}
        >
          <img src={sadImage} className={`${styles.bg_img_left}`} />
          <button
            onClick={(e) => {
              props.setShowAlert(false);
            }}
            className={`${panelStyles.exitButton} ${panelStyles.exitButtonPink}`}
          >
            &times;
          </button>
          <p className={`${styles.alertText}`}> {props.showAlert.text}</p>
        </div>
      )}

      {props.showAlert.emotion === "happy" && (
        <div
          tabIndex="0"
          id="Alert"
          className={`${g.boxStyle1} ${panelStyles.smallLandscapePanel} ${panelStyles.panelYellow1} ${s.noOutline} ${s.posRel}`}
        >
          <img src={happyImage} className={`${styles.bg_img_right}`} />
          <button
            onClick={(e) => {
              props.setShowAlert(false);
            }}
            className={`${panelStyles.exitButton} ${panelStyles.exitButtonYellow}`}
          >
            &times;
          </button>
          <p className={`${styles.alertText}`}> {props.showAlert.text}</p>
        </div>
      )}
    </>
  );
}
