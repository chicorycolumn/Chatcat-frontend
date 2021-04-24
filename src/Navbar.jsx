import React from "react";
import { Router, navigate, Link } from "@reach/router";
import genStyles from "./css/Generic.module.css";
import styles from "./css/Navbar.module.css";
import catlogo1 from "./images/catlogo1.png";
let devSwitch = false;

const Navbar = (props) => {
  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.navbarInnerBox}`}>
        <img className={`${styles.navbarLogo}`} src={catlogo1} />
        <h1 className={`${styles.navbarTitle}`}>Chatcat</h1>{" "}
      </div>{" "}
      <div className={`${styles.navbarInnerBox}`}>
        <Link className={`${styles.navbarItem}`} to="/">
          Main
        </Link>
        <Link className={`${styles.navbarItem}`} to="/lemons">
          Lemons
        </Link>
        <Link className={`${styles.navbarItem}`} to="/contact">
          Contact
        </Link>
      </div>
      {devSwitch && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.socket.emit("Dev query rooms");
            }}
          >
            Dev query rooms
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.socket.emit("Hello to all");
            }}
          >
            Hello to all
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
