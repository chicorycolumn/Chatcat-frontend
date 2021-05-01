import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";
import browserUtils from "./utils/browserUtils.js";
import displayUtils from "./utils/displayUtils.js";
import gameUtils from "./utils/gameUtils.js";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";

export default function LobbyPanel(props) {
  const [playerNameInput, setPlayerNameInput] = useState(
    props.playerData.playerName
  );

  useEffect(() => {
    if (props.playerData.playerName) {
      setPlayerNameInput(props.playerData.playerName);
    }

    displayUtils.addListenerForEnterToSend(
      $,
      document,
      "#enterButton_LobbyPanel",
      "#LobbyPanel"
    );

    return function cleanup() {
      $(document).off("keypress");
    };
  }, [props.playerData]);

  console.log("((LobbyPanel))");
  return (
    <div
      tabindex="0"
      id="LobbyPanel"
      className={`${g.box1} ${panelStyles.panelSize1} ${panelStyles.panelColorY1} ${s.noOutline}`}
    >
      <div className={`${panelStyles.innerBox1}`}>
        <h2
          className={`${s.noSelect} ${panelStyles.title1}`}
          onClick={() => {
            props.setRoomNameInput(roomUtils.createRoomName());
          }}
        >
          Create room
        </h2>
        <textarea
          onClick={(e) => {
            displayUtils.selectText(document, "roomNameInput_LobbyPanel");
          }}
          id="roomNameInput_LobbyPanel"
          value={props.roomNameInput}
          className={`${panelStyles.textarea1}`}
          maxLength={16}
          onChange={(e) => {
            props.setRoomNameInput(browserUtils.alphanumerise(e.target.value));
          }}
        ></textarea>
      </div>

      <div className={`${panelStyles.innerBox1}`}>
        <h2>Your name</h2>
        <textarea
          onClick={(e) => {
            displayUtils.selectText(document, "playerNameInput_LobbyPanel");
          }}
          id="playerNameInput_LobbyPanel"
          value={playerNameInput}
          className={`${panelStyles.textarea1}`}
          maxLength={16}
          onChange={(e) => {
            setPlayerNameInput(browserUtils.alphanumerise(e.target.value));
          }}
        ></textarea>
      </div>

      <div className={`${panelStyles.innerBox1}`}>
        <button
          id="enterButton_LobbyPanel"
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
                player: { playerName: playerNameInput },
              });
            }

            let roomPassword = roomUtils.fourLetterWord();

            browserUtils.setCookie(
              "roomPassword",
              `${roomPassword}-${props.roomNameInput}`
            );

            props.socket.emit("Create room", {
              roomName: props.roomNameInput,
              roomPassword,
            });
          }}
        >
          GO
        </button>
      </div>
    </div>
  );
}
