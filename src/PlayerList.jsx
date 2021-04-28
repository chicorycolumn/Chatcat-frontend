import styles from "./css/PlayerList.module.css";
import genStyles from "./css/Generic.module.css";
import s from "./css/s.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";

export default function PlayerList(props) {
  console.log("((PlayerList))");

  return (
    <div className={`${genStyles.minipanel1} ${s.overflowHidden}`}>
      <h2>Players</h2>
      <div className={`${styles.innerBox} ${s.overflowScroll}`}>
        {props.playerList &&
          props.playerList.map((roomPlayer) => {
            return (
              <div className={`${styles.nameItem}`}>
                <span className={`${styles.awards}`}>
                  {Math.floor(Math.random() * 10) % 2 ? "👑" : ""}
                </span>
                <span className={`${styles.name}`}>
                  {roomPlayer.playerName}
                </span>
                <span className={`${styles.stars}`}>
                  {`00${roomPlayer.stars.toString()}⭐`}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
