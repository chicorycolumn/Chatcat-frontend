import React, { useState } from "react";
import { Router, navigate } from "@reach/router";
import genStyles from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";

const roomAdjs = ["red", "green", "blue", "yellow", "purple", "orange"];
const roomNouns = ["alligator", "bison", "cat", "duck"];
function createRoomName() {
  let adj = roomAdjs[Math.floor(Math.random() * roomAdjs.length)];
  let noun = roomNouns[Math.floor(Math.random() * roomNouns.length)];
  return `${adj}${noun}`;
}

export default function RoomCreator(props) {
  return (
    <div className={`${genStyles.box1} ${panelStyles.mainPanel1}`}>
      <div className={`${panelStyles.innerBox}`}>
        <h2
          className={`${genStyles.noselect} ${panelStyles.title1}`}
          onClick={() => {
            props.setNewRoomName(createRoomName());
          }}
        >
          Create room
        </h2>
        <textarea
          value={props.newRoomName}
          className={`${panelStyles.textarea1}`}
          maxLength={18}
          onChange={(e) => {
            props.setNewRoomName(e.target.value);
          }}
        ></textarea>
      </div>

      <div className={`${panelStyles.innerBox}`}>
        <h2>Your name</h2>
        <textarea
          disabled="true"
          className={`${panelStyles.textarea1}`}
          maxLength={18}
        ></textarea>{" "}
      </div>

      <div className={`${panelStyles.innerBox}`}>
        <button
          className={`${genStyles.button1} ${panelStyles.button1}`}
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
