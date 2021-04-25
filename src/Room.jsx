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
  const location = useLocation();
  const [playerList, setPlayerList] = useState();
  const [roomLoaded, setRoomLoaded] = useState();

  console.log({
    roomLoaded,
    roomName: props.roomName,
    socket: !!props.socket,
    socketNudge: props.socketNudge,
  });

  useEffect(() => {
    console.log(`~~Room~~ props.socketNudge:${props.socketNudge}`);

    if (props.socket && !props.socket.id) {
      console.log("props.socket", props.socket);
      console.log("props.socket.id", props.socket.id);
      throw "Error 45";
    }

    if (props.socket && props.socketNudge && props.roomName) {
      console.log("qqq");
      if (!props.playerName) {
        props.setPlayerName(roomUtils.makeDummyName(props.socket.id));
      }

      if (!roomLoaded) {
        props.socket.emit("Request room data", { roomName: props.roomName });
      }

      props.socket.on("Room data", function (data) {
        setRoomLoaded(true);
        setPlayerList(data.room.players);
      });

      props.socket.on("Player entered your room", function (data) {
        console.log("Ø Player entered --ROOM");
        setPlayerList(data.room.players);
      });

      props.socket.on("Player left your room", function (data) {
        console.log("Ø Player left");
        setPlayerList(data.room.players);
      });
    }

    return function cleanup() {
      console.log("##Room##");
      if (props.socket) {
        console.log("€ Leave room");
        props.socket.off("Player entered your room");
        props.socket.off("Player left your room");
        props.setRoomName(null);
        props.socket.emit("Leave room", {
          roomName: location.pathname.slice(1),
        });
      }
    };
  }, [props.socketNudge]);

  return (
    <div className={`${styles.Room}`}>
      {props.roomName ? (
        <div className={`${styles.superContainer}`}>
          <div className={`${styles.mainContainer}`}>
            <PlayerList playerList={playerList} />
            <Instructions />
          </div>
          <div className={`${styles.mainContainer}`}></div>
          <div className={`${styles.box2}`}>
            <Chatbox
              socket={props.socket}
              socketNudge={props.socketNudge}
              playerName={props.playerName}
            />
          </div>
        </div>
      ) : (
        <PlayerNameCreator
          socket={props.socket}
          playerName={props.playerName}
          setPlayerName={props.setPlayerName}
        />
      )}
    </div>
  );
}
