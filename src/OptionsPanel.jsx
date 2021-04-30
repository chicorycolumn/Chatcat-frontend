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
import styles from "./css/OptionsPanel.module.css";

export default function OptionsPanel(props) {
  console.log("((OptionsPanel))");

  return (
    <div
      className={`${g.box1} ${panelStyles.panelSize2a} ${panelStyles.panelColorB1a}`}
    >
      {" "}
      <button
        onClick={(e) => {
          props.setShowOptionsPanel(false);
        }}
        className={`${panelStyles.exitButton1}`}
      >
        &times;
      </button>
      Options would go here.
    </div>
  );
}
