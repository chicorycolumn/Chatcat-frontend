import styles from "./css/PlayerNameCreator.module.css";
import genStyles from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";

export default function PlayerNameCreator(props) {
  const location = useLocation();

  return (
    <div className={`${genStyles.genericBox1} ${styles.playerNameInputForm}`}>
      <h1>Welcome player, what is your name?</h1>
      <input
        text
        value={props.playerName}
        onChange={(e) => {
          props.setPlayerName(e.value);
        }}
      ></input>
      <button
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
        Enter room
      </button>
    </div>
  );
}
