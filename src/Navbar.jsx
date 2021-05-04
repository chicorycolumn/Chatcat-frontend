import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import panelStyles from "./css/Panel.module.css";
import roomUtils from "./utils/roomUtils.js";
import browserUtils from "./utils/browserUtils.js";
import displayUtils from "./utils/displayUtils.js";
import gameUtils from "./utils/gameUtils.js";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import styles from "./css/Navbar.module.css";

import navlogo from "./images/logo_cat3b_pY1.png";
let devSwitch = false;

const Navbar = (props) => {
  return (
    <div
      id="navbar"
      className={`${styles.navbar} ${
        props.showNavbarAlert && styles.errorColor
      }`}
    >
      <Link
        className={`${styles.navbarInnerBoxLeft} ${styles.hoverable1}`}
        to="/"
      >
        <img className={`${styles.navbarLogo}`} src={navlogo} />
        <h1 className={`${styles.navbarTitle}`}>Chatcat</h1>{" "}
      </Link>

      <div className={`${styles.navbarInnerBoxMiddle}`}>
        {props.showNavbarAlert}
      </div>

      <div className={`${styles.navbarInnerBoxRight}`}>
        {props.successfullyEnteredRoomName && (
          <Link
            id="Invite_Navbar"
            className={`${styles.navbarItem} ${styles.hoverable1} ${
              props.showInvitePanel ? styles.hoverable1hovered : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              props.setShowInvitePanel(true);
            }}
            to=""
          >
            Invite
          </Link>
        )}
        <Link
          className={`${styles.navbarItem} ${styles.hoverable1} ${
            props.showOptionsPanel ? styles.hoverable1hovered : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            props.setShowOptionsPanel(true);
          }}
          to=""
        >
          Options
        </Link>

        {props.showDevButtons && (
          <>
            <button
              className={`${g.devButton} ${styles.navbarItem} ${styles.hoverable1}`}
              onClick={(e) => {
                e.preventDefault();
                props.socket.emit("Dev query");
              }}
            >
              dQ
            </button>
            <button
              className={`${g.devButton} ${styles.navbarItem} ${styles.hoverable1}`}
              onDoubleClick={(e) => {
                e.preventDefault();
                console.log("DESTROY");
                props.socket.emit("Dev destroy all");
              }}
            >
              dD
            </button>
          </>
        )}
      </div>
      {devSwitch && (
        <>
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
