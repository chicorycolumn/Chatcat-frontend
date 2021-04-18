import styles from "./css/Room.module.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "@reach/router";

export default function Room(props) {
  const [response, setResponse] = useState("");
  const [emotion_input, setEmotion_input] = useState("");
  const [emotion, setEmotion] = useState("neutral");
  const location = useLocation();

  useEffect(() => {
    return (
      props.socket &&
      props.roomName &&
      props.socket.emit("Leave room", { roomName: props.roomName })
    );
  });

  if (props.socket && !props.roomName) {
    props.socket.emit("Request entry", {
      roomName: location.pathname.slice(1),
    });
  }

  return (
    <div className={styles.Room}>
      {props.roomName ? <p>Welcome to {props.roomName}</p> : <p>Waiting...</p>}
      <h1>Current Players:</h1>
      {props.playerList &&
        props.playerList.map((roomPlayer) => {
          return <li>{roomPlayer.playerName}</li>;
        })}
    </div>
  );
}
