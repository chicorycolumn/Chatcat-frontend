import React, { useState, useEffect, useRef } from "react";
import styles from "./css/App.module.css";
import { Router, navigate, Link, useLocation } from "@reach/router";
import RoomCreator from "./RoomCreator.jsx";
import Contact from "./Contact.jsx";
import RoomWrapper from "./RoomWrapper.jsx";
import Navbar from "./Navbar.jsx";
import InvitePanel from "./InvitePanel.jsx";
import roomUtils from "./utils/roomUtils.js";
import gameUtils from "./utils/gameUtils.js";
import browserUtils, { getCookie } from "./utils/browserUtils.js";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4002";

export default function App() {
  console.log("((App))");

  const [roomNameInput, setRoomNameInput] = useState(null);
  const [playerData, setPlayerData] = useState({});
  console.log("((So playerData is)))", playerData);
  const [
    successfullyEnteredRoomName,
    setSuccessfullyEnteredRoomName,
  ] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketNudge, setSocketNudge] = useState();
  const [showInvitePanel, setShowInvitePanel] = useState();

  // const refContainer = useRef(null);

  useEffect(() => {
    let socket = socketIOClient(ENDPOINT);
    // refContainer.current = socket;
    setSocket(socket);

    console.log(`~~App~~ socket.id:${socket.id}`);

    socket.on("connect", (data) => {
      socket.emit("Load player", {
        truePlayerName: browserUtils.getCookie("truePlayerName"),
        playerName: browserUtils.getCookie("playerName"),
      });

      setSocketNudge(true);

      console.log(
        `Ø connect. I am ${socket.id.slice(
          0,
          5
        )} and I connected to server at ${new Date()
          .toUTCString()
          .slice(17, -4)}.`
      );
    });

    socket.on("Player loaded", function (data) {
      console.log(">>>> data.player:", data.player);
      console.log(">>>> playerData before set:", playerData);
      setPlayerData(data.player);
      console.log(">>>> playerData after set:", playerData);

      if (!data.player.playerName) {
        socket.emit("Update player data", {
          player: {
            truePlayerName: playerData.truePlayerName, //swde unnec
            playerName: roomUtils.makeDummyName(socket.id),
          },
        });
      }

      browserUtils.setCookie("playerName", data.player.playerName);
      browserUtils.setCookie("truePlayerName", data.player.truePlayerName);
    });

    socket.on("Entry granted", function (data) {
      console.log("Ø Entry granted");
      setSuccessfullyEnteredRoomName(data.room.roomName);
      navigate(`/${data.room.roomName}`);
    });

    socket.on("Room not created", function (data) {
      navigate("/");
      alert(data.msg);
    });

    socket.on("Dev queried", function (data) {
      console.log(data);
    });

    socket.on("Entry denied", function (data) {
      navigate("/");
      alert(data.msg);
    });

    socket.on("disconnect", (data) => {
      setSuccessfullyEnteredRoomName(null);
      console.log(
        `Ø disconnect. I disconnected from server at ${new Date()
          .toUTCString()
          .slice(17, -4)}.`
      );
    });

    return function cleanup() {
      console.log("##App##");
      setSuccessfullyEnteredRoomName(null);
      socket.disconnect();
    };
  }, []);

  console.log(`pre-R ${Object.keys(playerData).length}`, playerData);

  return (
    <div className={`${styles.App}`}>
      <Navbar
        socket={socket}
        setShowInvitePanel={setShowInvitePanel}
        successfullyEnteredRoomName={successfullyEnteredRoomName}
      />
      <header></header>
      {showInvitePanel && (
        <InvitePanel setShowInvitePanel={setShowInvitePanel} />
      )}
      <Router>
        <RoomCreator
          path="/"
          socket={socket}
          roomNameInput={roomNameInput}
          setRoomNameInput={setRoomNameInput}
          playerData={playerData}
        />
        <Contact path="/contact" />
        <RoomWrapper
          path="/*"
          socket={socket}
          socketNudge={socketNudge}
          successfullyEnteredRoomName={successfullyEnteredRoomName}
          setSuccessfullyEnteredRoomName={setSuccessfullyEnteredRoomName}
          playerData={playerData}
        />
      </Router>
    </div>
  );
}
