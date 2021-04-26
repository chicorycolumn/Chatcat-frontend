import styles from "./css/Room.module.css";
import genStyles from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import PlayerNameCreator from "./PlayerNameCreator";
import PlayerList from "./PlayerList";
import Instructions from "./Instructions";
import roomUtils from "./utils/roomUtils.js";
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
          <PlayerList playerList={props.roomData.players} />
          <Instructions />
        </div>
        <div className={`${styles.mainContainer}`}></div>
        <div className={`${styles.box2}`}>
          <Chatbox
            socket={props.socket}
            playerName={props.playerData.playerName}
            playerList={props.roomData.players}
          />
        </div>
      </div>
    </div>
  );
}
