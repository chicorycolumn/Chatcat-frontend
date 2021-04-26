import panelStyles from "./css/Panel.module.css";
import genStyles from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";

export default function PlayerNameCreator(props) {
  console.log("((PlayerNameCreator))");

  const location = useLocation();

  return (
    <div className={`${genStyles.box1} ${panelStyles.mainPanel2}`}>
      <div className={`${panelStyles.innerBox}`}>
        <h2 className={`${genStyles.noselect} ${panelStyles.title1}`}>
          Your name
        </h2>
        <textarea
          value={props.playerData.playerName}
          className={`${panelStyles.textarea1}`}
          maxLength={16}
          onChange={(e) => {
            props.updatePlayerData({ playerName: e.value }, props.socket);
          }}
        ></textarea>
      </div>

      <div className={`${panelStyles.innerBox}`}>
        <button
          disabled={!props.playerData.playerName}
          className={`${genStyles.button1} ${panelStyles.button1}`}
          onClick={(e) => {
            roomUtils.requestEntry(e, location, props.socket, props.playerData);
          }}
        >
          ENTER
        </button>
      </div>
    </div>
  );
}
