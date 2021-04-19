import React, { useState } from "react";
import { Router, navigate } from "@reach/router";
import styles from "./css/RoomCreator.module.css";

const roomAdjs = ["red", "green", "blue", "yellow", "purple", "orange"];
const roomNouns = ["alligator", "bison", "cat", "duck"];
function createRoomName() {
  let adj = roomAdjs[Math.floor(Math.random() * roomAdjs.length)];
  let noun = roomNouns[Math.floor(Math.random() * roomNouns.length)];
  return `${adj}${noun}`;
}

export default function RoomCreator(props) {
  return (
    <>
      <>
        <br />
        <button onClick={() => props.setNewRoomName(createRoomName())}>
          Generate room name
        </button>
        {props.newRoomName && (
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(`€ Create room ${props.newRoomName}.`);
              props.socket.emit("Create room", { roomName: props.newRoomName });
            }}
          >
            Create room {props.newRoomName}
          </button>
        )}

        <br />
        <button
          onClick={() => {
            console.log(props.socket.id.slice(0, 5));
            props.socket.emit("Prayer", "Our Father");
          }}
        >
          Emit Our Father
        </button>
      </>
    </>
  );
}
