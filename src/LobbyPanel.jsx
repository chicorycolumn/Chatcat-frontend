import React, { useEffect, useState } from "react";
import { Router, navigate } from "@reach/router";
import g from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";
import roomUtils from "./utils/roomUtils.js";

export default function LobbyPanel(props) {
  const [playerNameInput, setPlayerNameInput] = useState(
    props.playerData.playerName
  );

  useEffect(() => {
    if (props.playerData.playerName) {
      setPlayerNameInput(props.playerData.playerName);
    }
  }, [props.playerData]);

  console.log("((LobbyPanel))");
  return (
    <div
      className={`${g.box1} ${panelStyles.panelSize1} ${panelStyles.panelColorY1}`}
    >
      <div className={`${panelStyles.innerBox1}`}>
        <h2
          className={`${g.noselect} ${panelStyles.title1}`}
          onClick={() => {
            props.setRoomNameInput(roomUtils.createRoomName());
          }}
        >
          Create room
        </h2>
        <textarea
          id="roomNameInput_LobbyPanel"
          value={props.roomNameInput}
          className={`${panelStyles.textarea1}`}
          maxLength={16}
          onChange={(e) => {
            props.setRoomNameInput(e.target.value);
          }}
        ></textarea>
      </div>

      <div className={`${panelStyles.innerBox1}`}>
        <h2>Your name</h2>
        <textarea
          id="playerNameInput_LobbyPanel"
          value={playerNameInput}
          className={`${panelStyles.textarea1}`}
          maxLength={16}
          onChange={(e) => {
            setPlayerNameInput(e.target.value);
          }}
        ></textarea>
      </div>

      <div className={`${panelStyles.innerBox1}`}>
        <button
          disabled={!props.playerData.playerName || !props.roomNameInput}
          className={`${g.button1} ${panelStyles.button1}`}
          onClick={(e) => {
            e.preventDefault();

            console.log("N17", {
              playerNameInput,
              roomNameInput: props.roomNameInput,
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
              roomName: props.roomNameInput,
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
