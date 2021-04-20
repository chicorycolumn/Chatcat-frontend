import React, { useState, useEffect, useRef } from "react";
import { Router, navigate, Link } from "@reach/router";
import Lemons from "./Lemons.jsx";
import RoomCreator from "./RoomCreator.jsx";
import Contact from "./Contact.jsx";
import Room from "./Room.jsx";
import Navbar from "./Navbar.jsx";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4002";

export default function App() {
  const [newRoomName, setNewRoomName] = useState(null);
  const [socket, setSocket] = useState(null);
  // const refContainer = useRef(null);

  useEffect(() => {
    console.log("APP UE CALLED");
    let socket = socketIOClient(ENDPOINT);
    // refContainer.current = socket;
    setSocket(socket);

    console.log(`socket in useEffect in App is ${socket.id}.`);

    socket.on("connect", (data) => {
      console.log(
        `Ø connect. I am ${socket.id.slice(
          0,
          5
        )} and I connected to server at ${new Date()
          .toUTCString()
          .slice(17, -4)}.`
      );
    });

    socket.on("Room created", function (data) {
      console.log("Ø Room created");
      navigate(`/${data.roomName}`);
    });

    socket.on("Room not created", function (data) {
      console.log("Ø Room not created");
      navigate("/");
      alert(data.message);
    });

    socket.on("Dev queried rooms", function (data) {
      console.log("Ø Dev queried rooms. roomList", data.roomList);
    });

    socket.on("disconnect", (data) => {
      console.log(
        `Ø disconnect. I disconnected from server at ${new Date()
          .toUTCString()
          .slice(17, -4)}.`
      );
    });

    return function cleanup() {
      console.log("APP CLEANUP");
      console.log("€ disconnect");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div>
        <Navbar socket={socket}></Navbar>
        <header></header>
        <Router>
          <RoomCreator
            path="/"
            socket={socket}
            newRoomName={newRoomName}
            setNewRoomName={setNewRoomName}
          />
          <Lemons path="/lemons" />
          <Contact path="/contact" />
          <Room path="/*" socket={socket} />
        </Router>
      </div>
    </>
  );
}
