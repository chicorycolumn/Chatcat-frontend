import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";
import browserUtils from "./utils/browserUtils.js";
import displayUtils from "./utils/displayUtils.js";
import gameUtils from "./utils/gameUtils.js";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/PlayerList.module.css";

export default function Instructions(props) {
  return (
    <div className={`${panelStyles.smallPortraitPanel} ${s.overflowHidden} `}>
      <h2>Instructions</h2>
      <div
        className={`${styles.innerBox2} ${s.overflowScroll} ${g.paddingRight}`}
      >
        <p>
          This is a chat app where you can converse with your friends.
          <br />
          <br /> You simply enter your text in the box below and send.
          <br /> <br /> Then your friends will see and hopefully read it.
          <br /> <br /> This is accomplished with SocketIO 4.
        </p>
      </div>
    </div>
  );
}
