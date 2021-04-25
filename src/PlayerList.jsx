import styles from "./css/PlayerList.module.css";
import genStyles from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";

export default function PlayerList(props) {
  console.log("((PlayerList))");

  return (
    <div className={`${genStyles.minipanel1} ${genStyles.overflowHidden}`}>
      <h2>Players</h2>
      <div className={`${styles.innerBox} ${genStyles.overflowScroll}`}>
        {props.playerList &&
          props.playerList.map((roomPlayer) => {
            return (
              <div className={`${styles.nameItem}`}>
                {roomPlayer.playerName}
              </div>
            );
          })}
      </div>
    </div>
  );
}
