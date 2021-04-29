import panelStyles from "./css/Panel.module.css";
import g from "./css/Generic.module.css";
import styles from "./css/OptionsPanel.module.css";
import s from "./css/s.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";

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
