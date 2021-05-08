import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/PlayerList.module.css";
import roomStyles from "./css/Room.module.css";

import roomUtils from "./utils/roomUtils.js";
import browserUtils from "./utils/browserUtils.js";
import displayUtils from "./utils/displayUtils.js";
import gameUtils from "./utils/gameUtils.js";

export default function Instructions(props) {
  return (
    <div
      className={`${panelStyles.smallPortraitPanel} ${s.overflowHidden} ${s.flexCol}`}
    >
      <h2 className={`${roomStyles.roomHeaders}`}>Instructions</h2>
      <div
        className={`${styles.innerBox02} ${s.overflowScroll} ${g.paddingRight}`}
      >
        <p>
          This is a chat app where you can converse with your friends.
          <br /> <br /> Enter your message in the chatbox and send.
          <br /> <br /> Star your friends by typing "star" and then their name.
          <br /> <br /> This is built with SocketIO 4.
        </p>
      </div>
    </div>
  );
}
