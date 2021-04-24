import panelStyles from "./css/Panel.module.css";
import genStyles from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";

export default function PlayerNameCreator(props) {
  const location = useLocation();

  return (
    <div className={`${genStyles.box1} ${panelStyles.mainPanel2}`}>
      <div className={`${panelStyles.innerBox}`}>
        <h2 className={`${genStyles.noselect} ${panelStyles.title1}`}>
          Your name
        </h2>
        <textarea
          value={props.playerName}
          className={`${panelStyles.textarea1}`}
          maxLength={18}
          onChange={(e) => {
            props.setPlayerName(e.value);
          }}
        ></textarea>
      </div>

      <div className={`${panelStyles.innerBox}`}>
        <button
          className={`${genStyles.button1} ${panelStyles.button1}`}
          onClick={(e) => {
            e.preventDefault();
            console.log(
              `€ Request entry with socket: ${props.socket.id}`,
              props.socket
            );
            props.socket.emit("Request entry", {
              roomName: location.pathname.slice(1),
              playerName: props.playerName,
            });
          }}
        >
          ENTER
        </button>
      </div>
    </div>
  );
}
