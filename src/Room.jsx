import styles from "./css/Room.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";

export default function Room(props) {
  const [roomName, setRoomName] = useState(null);
  const [playerList, setPlayerList] = useState(null);

  const location = useLocation();

  useEffect(() => {
    console.log("ROOM UE CALLED");

    if (props.socket) {
      props.socket.on("Entry granted", function (data) {
        console.log("Ø Entry granted");
        console.log("Setting roomName.");
        setRoomName(data.roomData.roomName);
        console.log("Setting playerList.");
        setPlayerList(data.roomData.players);
      });

      props.socket.on("Player entered your room", function (data) {
        console.log(`Ø ${data.playerId.slice(0, 5)} entered your room`);
        console.log("Updating playerList.");
        setPlayerList(data.roomData.players);
      });

      props.socket.on("Entry denied", function (data) {
        console.log("Ø Entry denied");
        navigate("/");
        alert(data.message);
      });

      props.socket.on("Hello to all", function (data) {
        console.log(`Ø ${data.msg}`);
      });
    }

    return function leaveRoom() {
      console.log("ROOM CLEANUP");
      if (props.socket) {
        console.log("€ Leave room");
        props.socket.emit("Leave room", {
          roomName: location.pathname.slice(1),
        });
        // navigate("/");
      }
    };
  }, [props.socket]);

  if (props.socket && !roomName) {
    setTimeout(() => {
      console.log(
        `€ Request entry with socket: ${props.socket.id}`,
        props.socket
      );
      props.socket.emit("Request entry", {
        roomName: location.pathname.slice(1),
      });
    }, 1000);
  }

  return (
    <div className={styles.Room}>
      {roomName ? <p>Welcome to {roomName}</p> : <p>Waiting...</p>}
      <h1>Current Players:</h1>
      {playerList &&
        playerList.map((roomPlayer) => {
          return <li>{roomPlayer.playerName}</li>;
        })}
    </div>
  );
}
