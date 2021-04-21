import styles from "./css/Room.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";

function makeDummyName(id) {
  let firstNames = [
    "alexandra",
    "billy",
    "cameron",
    "daniela",
    "edward",
    "frank",
    "geraldine",
    "helena",
    "imogen",
    "julia",
    "katherine",
    "leanne",
    "michael",
    "norbert",
    "oscar",
    "patricia",
    "quentin",
    "roberto",
    "samantha",
    "timothy",
    "umberto",
    "valerie",
    "william",
    "xanthia",
    "yorkie",
    "zoe",
  ];
  let firstName;
  let prefix = "";
  let lastIndex;

  id.split("").forEach((char, index) => {
    if (!firstName) {
      if (!/\d/.test(char)) {
        firstName = firstNames
          .find((name) => name[0] === char.toLowerCase())
          .split("");
        firstName[0] = id[index];
        firstName[1] = id[index + 1];
        lastIndex = index + 2;
      } else {
        prefix += char.toString();
      }
    }
  });

  return `${prefix}${firstName.join("")} ${id.slice(lastIndex, lastIndex + 2)}`;
}

export default function Room(props) {
  const [roomName, setRoomName] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [playerList, setPlayerList] = useState(null);

  const location = useLocation();

  useEffect(() => {
    console.log("ROOM UE CALLED");

    if (props.socket && !props.socket.id) {
      console.log("props.socket", props.socket);
      console.log("props.socket.id", props.socket.id);
      throw "Error 45";
    }

    if (props.socket) {
      if (!playerName) {
        setPlayerName(makeDummyName(props.socket.id));
      }

      props.socket.on("Entry granted", function (data) {
        console.log("Ø Entry granted");
        console.log("Setting roomName.");
        setRoomName(data.room.roomName);
        console.log("Setting playerList.");
        setPlayerList(data.room.players);
      });

      props.socket.on("Player entered your room", function (data) {
        console.log(`Ø ${data.player.playerName} entered your room`);
        console.log("Updating playerList.");
        setPlayerList(data.room.players);
      });

      props.socket.on("Player left your room", function (data) {
        console.log(`Ø ${data.player.playerName} left your room`);
        console.log("Updating playerList.");
        setPlayerList(data.room.players);
      });

      props.socket.on("Entry denied", function (data) {
        console.log("Ø Entry denied");
        navigate("/");
        alert(data.msg);
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
  }, [props.socketNudge]);

  return (
    <div className={styles.Room}>
      {roomName ? (
        <p>Welcome to {roomName}</p>
      ) : (
        <>
          <h1>Welcome player, what is your name?</h1>
          <input
            text
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.value);
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
                playerName: playerName,
              });
            }}
          >
            Enter room
          </button>
        </>
      )}
      <h1>Current Players:</h1>
      {playerList &&
        playerList.map((roomPlayer) => {
          return <li>{roomPlayer.playerName}</li>;
        })}
    </div>
  );
}
