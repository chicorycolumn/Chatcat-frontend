import panelStyles from "./css/Panel.module.css";
import genStyles from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";

export default function InvitePanel(props) {
  console.log("((InvitePanel))");

  return (
    <div
      className={`${genStyles.box1} ${panelStyles.panelSize1} ${panelStyles.panelColorB1}`}
    >
      <button
        onClick={(e) => {
          props.setShowInvitePanel(false);
        }}
        className={`${genStyles.exitButton1}`}
      >
        &times;
      </button>
      <div className={`${panelStyles.innerBox}`}>
        <h2 className={`${genStyles.noselect} ${panelStyles.title1}`}>
          InvitePanel is this
        </h2>
        location.pathName
      </div>
    </div>
  );
}
