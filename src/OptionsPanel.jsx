import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/OptionsPanel.module.css";

const roomUtils = require("./utils/roomUtils.js");
const browserUtils = require("./utils/browserUtils.js");
const displayUtils = require("./utils/displayUtils.js");
const gameUtils = require("./utils/gameUtils.js");

export default function OptionsPanel(props) {
  console.log("((OptionsPanel))");

  useEffect(() => {
    $(document).on("click.OptionsPanel", () => {
      displayUtils.clickOutsideToClose(
        "#OptionsPanel",
        props.setShowOptionsPanel
      );
    });

    return function cleanup() {
      $(document).off("click.OptionsPanel");
    };
  }, []);

  return (
    <div
      tabindex="0"
      id="OptionsPanel"
      className={`${s.fadeIn} ${g.boxStyle1} ${panelStyles.mediumLandscapePanel} ${panelStyles.panelBlue2} ${s.noOutline}`}
    >
      <button
        onClick={(e) => {
          props.setShowOptionsPanel(false);
        }}
        className={`${panelStyles.exitButton} ${panelStyles.exitButtonBlue}`}
      >
        &times;
      </button>
      Options would go here.
    </div>
  );
}
