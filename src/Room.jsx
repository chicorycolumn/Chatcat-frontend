import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import panelStyles from "./css/Panel.module.css";
import roomUtils from "./utils/roomUtils.js";
import browserUtils from "./utils/browserUtils.js";
import displayUtils from "./utils/displayUtils.js";
import gameUtils from "./utils/gameUtils.js";
import $ from "jquery";

import g from "./css/Generic.module.css";
import styles from "./css/Room.module.css";

import DoorPanel from "./DoorPanel";
import PlayerList from "./PlayerList";
import Instructions from "./Instructions";
import Chatbox from "./Chatbox";

export default function Room(props) {
  console.log("((Room))");

  useEffect(() => {
    return function cleanup() {
      console.log("##Room## (will leave room)");
      if (props.socket) {
        props.socket.off("Player entered your room");
        props.socket.off("Player left your room");
        let rooName = props.roomData.roomName;
        props.setRoomData(null);
        props.socket.emit("Leave room", {
          roomName: rooName,
        });
      }
    };
  }, []);

  return (
    <div className={`${styles.Room}`}>
      <div className={`${styles.superContainer}`}>
        <div className={`${styles.mainContainer}`}>
          <PlayerList
            playerData={props.playerData}
            roomData={props.roomData}
            playerList={props.roomData.players}
            socket={props.socket}
          />
          <Instructions />
        </div>
        <div className={`${styles.mainContainer}`}></div>
        <div className={`${styles.box2}`}>
          <Chatbox
            socket={props.socket}
            playerData={props.playerData}
            playerList={props.roomData.players}
          />
        </div>
      </div>
    </div>
  );
}
