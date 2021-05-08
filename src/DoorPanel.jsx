import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import a from "./css/Animations.module.css";
import panelStyles from "./css/Panel.module.css";

import * as roomUtils from "./utils/roomUtils.js";
import * as browserUtils from "./utils/browserUtils.js";
import * as displayUtils from "./utils/displayUtils.js";
import * as gameUtils from "./utils/gameUtils.js";

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
    displayUtils.unsplash(a, "#enterButton_DoorPanel");
    $("#enterButton_DoorPanel").on("click", function (e) {
      displayUtils.splash(a, e, 2, 1);
    });

    setTimeout(() => {
      $("#roomPasswordInput_DoorPanel").select();
    }, 100);

    if (props.playerData.playerName) {
      setPlayerNameInput(props.playerData.playerName);
    }

    $("#DoorPanel").focus();

    displayUtils.addListenerForKeydownEnterToSend(
      document,
      "#enterButton_DoorPanel",
      "#DoorPanel"
    );

    return function cleanup() {
      $(document).off("keydown");
    };
  }, [props.playerData]);

  return (
    <div
      tabIndex="0"
      id="DoorPanel"
      className={`${g.boxStyle1} ${panelStyles.bigPortraitPanel} ${panelStyles.panelPink1} ${s.noOutline}`}
    >
      <div className={`${panelStyles.innerBox1}`}>
        <h2 className={`${s.noSelect} ${panelStyles.title1}`}>Your name</h2>
        <textarea
          onClick={(e) => {
            displayUtils.selectText(document, "playerNameInput_DoorPanel");
          }}
          id="playerNameInput_DoorPanel"
          value={playerNameInput}
          className={`${panelStyles.textarea1}`}
          maxLength={12}
          onChange={(e) => {
            setPlayerNameInput(browserUtils.alphanumerise(e.target.value));
            console.log(
              `playerNameInput_DoorPanel. playerNameInput:${playerNameInput}.`
            );
          }}
        ></textarea>
      </div>
      <div className={`${panelStyles.innerBox1}`}>
        <h2 className={`${s.noSelect} ${panelStyles.title1}`}>Room password</h2>
        <textarea
          onClick={(e) => {
            displayUtils.selectText(document, "roomPasswordInput_DoorPanel");
          }}
          id="roomPasswordInput_DoorPanel"
          value={roomPasswordInput}
          className={`${panelStyles.textarea1}`}
          maxLength={4}
          onChange={(e) => {
            setRoomPasswordInput(
              browserUtils.alphanumerise(e.target.value).toUpperCase()
            );
            console.log(
              `roomPasswordInput_DoorPanel. roomPasswordInput:${roomPasswordInput}.`
            );
          }}
        ></textarea>
      </div>

      <div className={`${panelStyles.innerBox1}`}>
        <button
          id="enterButton_DoorPanel"
          disabled={
            $("#connectErrorAlert").length ||
            !playerNameInput ||
            !roomPasswordInput
          }
          className={`${g.button1} ${panelStyles.button1}`}
          onClick={(e) => {
            e.preventDefault();

            if (playerNameInput !== props.playerData.playerName) {
              console.log(
                `€ Update player data. playerNameInput:${playerNameInput}.`
              );
              props.socket.emit("Update player data", {
                player: {
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
          {$("#connectErrorAlert").length ? "Waiting for server..." : "ENTER"}
        </button>
      </div>
    </div>
  );
}
