import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";
import browserUtils from "./utils/browserUtils.js";
import displayUtils from "./utils/displayUtils.js";
import gameUtils from "./utils/gameUtils.js";
import $ from "jquery";

import g from "./css/Generic.module.css";
import styles from "./css/Room.module.css";
import panelStyles from "./css/Panel.module.css";

import DoorPanel from "./DoorPanel";
import PlayerList from "./PlayerList";
import Room from "./Room";
import Instructions from "./Instructions";
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

      props.socket.on("Room password updated", function (data) {
        if (data.roomName !== props.successfullyEnteredRoomName) {
          console.log(
            `D55 Why do these roomnames not match? data.roomName:"${data.roomName}", props.successfullyEnteredRoomName:"${props.successfullyEnteredRoomName}".`
          );
          return;
        }

        browserUtils.setCookie(
          "roomPassword",
          `${data.roomPassword}-${data.roomName}`
        );
      });

      props.socket.on("Player entered your room", function (data) {
        setRoomData(data.room);
      });

      props.socket.on("Player left your room", function (data) {
        if (data.player.truePlayerName === props.playerData.truePlayerName) {
          navigate("/");
          alert(
            `You're being booted from this room. Perhaps you entered this room in another window and then closed it?`
          );
        }
        setRoomData(data.room);
      });

      props.socket.on("You're booted", function (data) {
        console.log(`Ø You're booted from ${data.roomName}.`);
        if (roomData && roomData.roomName === data.roomName) {
          navigate("/");
          props.setSuccessfullyEnteredRoomName(null);
          alert(data.msg);
          props.socket.emit("I was booted", data);
        } else {
          console.log(
            `N49 The server wants to boot me from room ${data.roomName} but I'm not in that room, I think?`
          );
          throw "N49";
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
    <DoorPanel socket={props.socket} playerData={props.playerData} />
  );
}
