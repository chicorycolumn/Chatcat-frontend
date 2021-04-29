import panelStyles from "./css/Panel.module.css";
import g from "./css/Generic.module.css";
import React, { useEffect, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";

export default function DoorPanel(props) {
  console.log("((DoorPanel))");
  const [playerNameInput, setPlayerNameInput] = useState(
    props.playerData.playerName
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
        <button
          disabled={!props.playerData.playerName}
          className={`${g.button1} ${panelStyles.button1}`}
          onClick={(e) => {
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

            roomUtils.requestEntry(e, location, props.socket, props.playerData);
          }}
        >
          ENTER
        </button>
      </div>
    </div>
  );
}
