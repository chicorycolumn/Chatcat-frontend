import styles from "./css/Room.module.css";
import g from "./css/Generic.module.css";
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
            truePlayerName: props.playerData.truePlayerName, //swde unnec
            playerName: roomUtils.makeDummyName(props.socket.id),
          },
        });
      }

      if (!roomData) {
        props.socket.emit("Request room data", {
          roomName: props.successfullyEnteredRoomName,
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

      props.socket.on("You're booted", function (data) {
        console.log(`Ø You're booted from ${data.roomName}.`);
        props.setSuccessfullyEnteredRoomName(null);
        if (roomData && roomData.roomName === data.roomName) {
          navigate("/");
          alert(data.msg);
        }
      });
    }

    return function cleanup() {
      console.log("##RoomWrapper##");
    };
  }, [props.successfullyEnteredRoomName]);

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
