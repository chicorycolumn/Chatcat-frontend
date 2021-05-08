import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import panelStyles from "./css/Panel.module.css";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import styles from "./css/Navbar.module.css";

import navlogo from "./images/logo_cat3b_pY1.png";
import navlogoBroken from "./images/logo_cat3b_pY1_broken.png";

import * as roomUtils from "./utils/roomUtils.js";
import * as browserUtils from "./utils/browserUtils.js";
import * as displayUtils from "./utils/displayUtils.js";
import * as gameUtils from "./utils/gameUtils.js";

let devSwitch = false;

const Navbar = (props) => {
  return (
    <div
      id="navbar"
      className={`${styles.navbar} ${
        props.connectErrorAlert && styles.errorColor
      }`}
    >
      <Link
        className={`${styles.navbarInnerBoxLeft} ${styles.hoverable1}`}
        to="/"
      >
        {props.connectErrorAlert ? (
          <img
            id="connectErrorAlert"
            className={`${styles.navbarLogo}`}
            src={navlogoBroken}
          />
        ) : (
          <img className={`${styles.navbarLogo}`} src={navlogo} />
        )}
        <h1 className={`${styles.navbarTitle}`}>Chattercat</h1>{" "}
      </Link>

      {/* {props.connectErrorAlert && (
        <div
          id="connectErrorAlert"
          className={`${styles.navbarInnerBoxMiddle}`}
        >
          {props.connectErrorAlert}
        </div>
      )} */}

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
          className={`${styles.navbarItem} ${styles.navbarItemSmall}  ${
            styles.hoverable1
          } ${props.showOptionsPanel ? styles.hoverable1hovered : ""}`}
          onClick={(e) => {
            e.preventDefault();
            props.setShowOptionsPanel(true);
          }}
          to=""
        >
          ⚙
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
