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
import styles from "./css/PlayerList.module.css";

export default function PlayerList(props) {
  console.log("((PlayerList))");

  return (
    <div className={`${g.minipanel1} ${s.overflowHidden}`}>
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
