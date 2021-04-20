import React from "react";
import { Router, navigate, Link } from "@reach/router";

const Navbar = (props) => {
  return (
    <div>
      <Link to="/">---Go to Main</Link>
      <Link to="/lemons">---Go to Lemons</Link>
      <Link to="/contact">---Go to Contact</Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("€ Dev query rooms.");
          props.socket.emit("Dev query rooms");
        }}
      >
        Dev query rooms
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("€ Hello to all.");
          props.socket.emit("Hello to all");
        }}
      >
        Hello to all
      </button>
    </div>
  );
};

export default Navbar;
