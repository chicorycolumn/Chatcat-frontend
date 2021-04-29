import panelStyles from "./css/Panel.module.css";
import g from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";
import browserUtils, { getCookie, setCookie } from "./utils/browserUtils.js";

export default function DoorPanel(props) {
  console.log("((DoorPanel))");
  const [playerNameInput, setPlayerNameInput] = useState(
    props.playerData.playerName
  );

  let rpw = browserUtils.getCookie("roomPassword");

  const [roomPasswordInput, setRoomPasswordInput] = useState(
    rpw ? rpw.split("-")[0] : ""
  );

  const location = useLocation();

  useEffect(() => {
    if (props.playerData.playerName) {
      setPlayerNameInput(props.playerData.playerName);
    }
  }, [props.playerData]);

  return (
    <div
      className={`${g.box1} ${panelStyles.panelSize1} ${panelStyles.panelColorP1}`}
    >
      <div className={`${panelStyles.innerBox1}`}>
        <h2 className={`${g.noselect} ${panelStyles.title1}`}>Your name</h2>
        <textarea
          id="playerNameInput_DoorPanel"
          value={playerNameInput}
          className={`${panelStyles.textarea1}`}
          maxLength={16}
          onChange={(e) => {
            setPlayerNameInput(e.target.value);
            console.log(
              `playerNameInput_DoorPanel. playerNameInput:${playerNameInput}.`
            );
          }}
        ></textarea>
      </div>
      <div className={`${panelStyles.innerBox1}`}>
        <h2 className={`${g.noselect} ${panelStyles.title1}`}>Password</h2>
        <textarea
          id="roomPasswordInput_DoorPanel"
          value={roomPasswordInput}
          className={`${panelStyles.textarea1}`}
          maxLength={4}
          onChange={(e) => {
            setRoomPasswordInput(e.target.value.toUpperCase());
            console.log(
              `roomPasswordInput_DoorPanel. roomPasswordInput:${roomPasswordInput}.`
            );
          }}
        ></textarea>
      </div>

      <div className={`${panelStyles.innerBox1}`}>
        <button
          disabled={!props.playerData.playerName}
          className={`${g.button1} ${panelStyles.button1}`}
          onClick={(e) => {
            e.preventDefault();

            if (playerNameInput !== props.playerData.playerName) {
              console.log(
                `€ Update player data. playerNameInput:${playerNameInput}.`
              );
              props.socket.emit("Update player data", {
                player: {
                  truePlayerName: props.playerData.truePlayerName, //swde unnec
                  playerName: playerNameInput,
                },
              });
            }

            let roomName = location.pathname.slice(1);

            browserUtils.setCookie(
              "roomPassword",
              `${roomPasswordInput}-${roomName}`
            );

            roomUtils.requestEntry(
              props.socket,
              props.playerData,
              roomName,
              roomPasswordInput
            );
          }}
        >
          ENTER
        </button>
      </div>
    </div>
  );
}
