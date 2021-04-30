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

import alertcat from "./images/witchcat_sad_exclam.png";

export default function Alert(props) {
  console.log("((Alert))");

  useEffect(() => {
    $(document).on("click", function () {
      if (!($("#Alert").is(":focus") || $("#Alert").find(":focus").length)) {
        props.setShowAlert(false);
      }
    });

    return function cleanup() {
      $(document).off("click");
    };
  }, []);

  return (
    <div
      tabindex="0"
      id="Alert"
      className={`${g.box1} ${panelStyles.panelSize3} ${panelStyles.panelColorP2} ${s.noOutline} ${s.posRel}`}
    >
      <img src={alertcat} className={`${styles.bg_img}`} />
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
