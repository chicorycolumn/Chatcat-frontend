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

  useEffect(() => {
    function JQF_clickOutsideToClose() {
      if (
        !(
          $("#OptionsPanel").is(":focus") ||
          $("#OptionsPanel").find(":focus").length
        )
      ) {
        props.setShowOptionsPanel(false);
      }
    }

    $(document).on("click", JQF_clickOutsideToClose);

    return function cleanup() {
      $(document).off("click", JQF_clickOutsideToClose);
    };
  }, []);

  return (
    <div
      tabindex="0"
      id="OptionsPanel"
      className={`${s.fadeIn} ${g.box1} ${panelStyles.mediumLandscapePanel} ${panelStyles.panelBlue2} ${s.noOutline}`}
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
