import React, { useState } from "react";
import { Router, navigate } from "@reach/router";
import genStyles from "./css/Generic.module.css";
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
    <div className={`${genStyles.box1} ${styles.roomCreatorBox}`}>
      <div className={`${styles.innerBox}`}>
        <h2
          className={`${genStyles.noselect} ${styles.title1}`}
          onClick={() => {
            props.setNewRoomName(createRoomName());
          }}
        >
          Create room
        </h2>
        <textarea
          value={props.newRoomName}
          className={`${styles.textarea1}`}
          maxLength={18}
          onChange={(e) => {
            props.setNewRoomName(e.target.value);
          }}
        ></textarea>
      </div>

      <div className={`${styles.innerBox}`}>
        <h2>Your name</h2>
        <textarea
          disabled="true"
          className={`${styles.textarea1}`}
          maxLength={18}
        ></textarea>{" "}
      </div>

      <div className={`${styles.innerBox}`}>
        <button
          className={`${genStyles.button1} ${styles.button1}`}
          onClick={(e) => {
            e.preventDefault();
            props.socket.emit("Create room", { roomName: props.newRoomName });
          }}
        >
          GO
        </button>
      </div>
    </div>
  );
}
