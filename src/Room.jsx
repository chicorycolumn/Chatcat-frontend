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
    if (props.socket) {
      console.log("rrr");

      props.socket.on("Player entered your room", function (data) {
        console.log("Ø Player entered --ROOM");
        props.setRoomData(data.room);
      });

      props.socket.on("Player left your room", function (data) {
        console.log("Ø Player left");
        props.setRoomData(data.room);
      });
    }

    return function cleanup() {
      console.log("##Room##");
      if (props.socket) {
        console.log("€ Leave room");
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
          <Chatbox socket={props.socket} playerName={props.playerName} />
        </div>
      </div>
    </div>
  );
}
