import styles from "./css/Room.module.css";
import genStyles from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import PlayerNameCreator from "./PlayerNameCreator";
import PlayerList from "./PlayerList";
import Room from "./Room";
import Instructions from "./Instructions";
import roomUtils from "./utils/roomUtils.js";
import Chatbox from "./Chatbox";

export default function RoomWrapper(props) {
  console.log("((RoomWrapper))");
  const location = useLocation();
  const [roomData, setRoomData] = useState();

  useEffect(() => {
    console.log(`~~RoomWrapper~~ props.socketNudge:${props.socketNudge}`);

    if (props.socket && props.socketNudge) {
      if (!props.playerData.playerName) {
        props.socket.emit("Update player data", {
          player: {
            playerName: roomUtils.makeDummyName(props.socket.id),
          },
        });
      }

      if (!roomData) {
        props.socket.emit("Request room data", {
          roomName: props.roomName,
        });
      }

      props.socket.on("Room data", function (data) {
        setRoomData(data.room);
      });

      props.socket.on("Player entered your room", function (data) {
        setRoomData(data.room);
      });

      props.socket.on("Player left your room", function (data) {
        setRoomData(data.room);
      });
    }

    return function cleanup() {
      console.log("##RoomWrapper##");
    };
  }, [props.roomName]);

  return roomData ? (
    <Room
      socket={props.socket}
      playerData={props.playerData}
      roomData={roomData}
      setRoomData={setRoomData}
    />
  ) : (
    <PlayerNameCreator socket={props.socket} playerData={props.playerData} />
  );
}
