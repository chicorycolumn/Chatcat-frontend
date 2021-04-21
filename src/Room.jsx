import styles from "./css/Room.module.css";
import genericStyles from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import PlayerNameCreator from "./PlayerNameCreator";
import Chatbox from "./Chatbox";

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

    if (props.socket && props.socketNudge) {
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
      }
    };
  }, [props.socketNudge]);

  return (
    <div className={`${styles.Room}`}>
      {roomName ? (
        <>
          <h1>Welcome to {roomName}</h1>

          <div
            className={`${genericStyles.genericBox1} ${styles.playerListBox}`}
          >
            <h1>Current Players:</h1>
            <ul>
              {playerList &&
                playerList.map((roomPlayer) => {
                  return <li>{roomPlayer.playerName}</li>;
                })}
            </ul>
          </div>

          <Chatbox
            socket={props.socket}
            playerName={playerName}
            playerList={playerList}
          />
        </>
      ) : (
        <PlayerNameCreator
          socket={props.socket}
          playerName={playerName}
          setPlayerName={setPlayerName}
        />
      )}
    </div>
  );
}

function makeDummyName(id) {
  let firstNames = [
    "alexandra",
    "billy",
    "cameron",
    "daniela",
    "edward",
    "frankie",
    "geraldine",
    "helena",
    "imogen",
    "julianne",
    "katherine",
    "leanne",
    "michael",
    "norbert",
    "oliver",
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
    "zachary",
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
