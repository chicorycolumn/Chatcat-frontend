import React, { useState } from "react";
import { Router, navigate } from "@reach/router";
import genStyles from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";
import roomUtils from "./utils/roomUtils.js";

export default function RoomCreator(props) {
  const [playerNameInput, setPlayerNameInput] = useState(
    props.playerData.playerName
  );

  console.log("((RoomCreator))");
  return (
    <div className={`${genStyles.box1} ${panelStyles.mainPanel1}`}>
      <div className={`${panelStyles.innerBox}`}>
        <h2
          className={`${genStyles.noselect} ${panelStyles.title1}`}
          onClick={() => {
            props.setNewRoomName(roomUtils.createRoomName());
          }}
        >
          Create room
        </h2>
        <textarea
          value={props.newRoomName}
          className={`${panelStyles.textarea1}`}
          maxLength={16}
          onChange={(e) => {
            props.setNewRoomName(e.target.value);
          }}
        ></textarea>
      </div>

      <div className={`${panelStyles.innerBox}`}>
        <h2>Your name</h2>
        <textarea
          value={playerNameInput}
          className={`${panelStyles.textarea1}`}
          maxLength={16}
          onChange={(e) => {
            setPlayerNameInput(e.target.value);
          }}
        ></textarea>
      </div>

      <div className={`${panelStyles.innerBox}`}>
        <button
          disabled={!props.playerData.playerName || !props.newRoomName}
          className={`${genStyles.button1} ${panelStyles.button1}`}
          onClick={(e) => {
            e.preventDefault();

            console.log("N17", {
              playerNameInput,
              newRoomName: props.newRoomName,
            });

            if (playerNameInput !== props.playerData.playerName) {
              console.log(
                `Hey! € Update player data with playerName:${playerNameInput}.`
              );
              props.socket.emit("Update player data", {
                truePlayerName: props.playerData.truePlayerName, //swde unnec
                player: { playerName: playerNameInput },
              });
            }

            props.socket.emit("Create room", {
              roomName: props.newRoomName,
              truePlayerName: props.playerData.truePlayerName, //swde unnec
            });
          }}
        >
          GO
        </button>
      </div>
    </div>
  );
}
