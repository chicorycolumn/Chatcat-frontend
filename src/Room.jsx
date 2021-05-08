import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import panelStyles from "./css/Panel.module.css";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import styles from "./css/Room.module.css";

import DoorPanel from "./DoorPanel";
import PlayerList from "./PlayerList";
import Instructions from "./Instructions";
import Chatbox from "./Chatbox";

const roomUtils = require("./utils/roomUtils.js");
const browserUtils = require("./utils/browserUtils.js");
const displayUtils = require("./utils/displayUtils.js");
const gameUtils = require("./utils/gameUtils.js");

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
        props.setSuccessfullyEnteredRoomName(null);
        props.socket.emit("Leave room", {
          roomName: rooName,
        });
      }
    };
  }, []);

  return (
    <div className={`${styles.Room}`}>
      <div className={`${styles.topContainer}`}>
        <PlayerList
          playerData={props.playerData}
          roomData={props.roomData}
          playerList={props.roomData.players}
          socket={props.socket}
          successfullyEnteredRoomName={props.successfullyEnteredRoomName}
        />
        <Instructions />
      </div>
      <div className={`${styles.bottomContainer}`}>
        <Chatbox
          socket={props.socket}
          playerData={props.playerData}
          playerList={props.roomData.players}
        />
      </div>
    </div>
  );
}
