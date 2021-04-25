import React, { useState, useEffect, useRef } from "react";
import styles from "./css/App.module.css";
import { Router, navigate, Link, useLocation } from "@reach/router";
import RoomCreator from "./RoomCreator.jsx";
import Contact from "./Contact.jsx";
import RoomWrapper from "./RoomWrapper.jsx";
import Navbar from "./Navbar.jsx";
import roomUtils from "./utils/roomUtils.js";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4002";

export default function App() {
  console.log("((App))");
  const [newRoomName, setNewRoomName] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketNudge, setSocketNudge] = useState();

  // const refContainer = useRef(null);

  useEffect(() => {
    console.log("~~App~~");
    let socket = socketIOClient(ENDPOINT);
    // refContainer.current = socket;
    setSocket(socket);

    console.log(`socket in useEffect in App is ${socket.id}.`);

    socket.on("connect", (data) => {
      setSocketNudge(true);
      console.log(`App socket connect. playerName:${playerName}.`);
      if (!playerName) {
        setPlayerName(roomUtils.makeDummyName(socket.id));
      }

      console.log(
        `Ø connect. I am ${socket.id.slice(
          0,
          5
        )} and I connected to server at ${new Date()
          .toUTCString()
          .slice(17, -4)}.`
      );
    });

    socket.on("Entry granted", function (data) {
      console.log("Ø Entry granted");
      setRoomName(data.room.roomName);
      navigate(`/${data.room.roomName}`);
    });

    socket.on("Room not created", function (data) {
      navigate("/");
      alert(data.msg);
    });

    socket.on("Dev queried rooms", function (data) {
      console.log("Ø Dev queried rooms. roomList", data.rooms);
    });

    socket.on("Entry denied", function (data) {
      console.log("Ø Entry denied");
      navigate("/");
      alert(data.msg);
    });

    socket.on("disconnect", (data) => {
      setRoomName(null);
      console.log(
        `Ø disconnect. I disconnected from server at ${new Date()
          .toUTCString()
          .slice(17, -4)}.`
      );
    });

    return function cleanup() {
      console.log("##App##");
      setRoomName(null);
      socket.disconnect();
    };
  }, []);

  return (
    <div className={`${styles.App}`}>
      <Navbar socket={socket}></Navbar>
      <header></header>
      <Router>
        <RoomCreator
          path="/"
          socket={socket}
          newRoomName={newRoomName}
          setNewRoomName={setNewRoomName}
          playerName={playerName}
          setPlayerName={setPlayerName}
        />
        <Contact path="/contact" />
        <RoomWrapper
          path="/*"
          socket={socket}
          socketNudge={socketNudge}
          roomName={roomName}
          playerName={playerName}
          setPlayerName={setPlayerName}
        />
      </Router>
    </div>
  );
}
