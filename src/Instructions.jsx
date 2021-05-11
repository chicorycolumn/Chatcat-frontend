import React from "react";

import s from "./css/Simple.module.css";
import g from "./css/Generic.module.css";
import a from "./css/Animations.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/PlayerList.module.css";
import roomStyles from "./css/Room.module.css";

import * as roomUtils from "./utils/roomUtils.js";
import * as browserUtils from "./utils/browserUtils.js";
import * as displayUtils from "./utils/displayUtils.js";
import * as gameUtils from "./utils/gameUtils.js";

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
          <br /> <br /> Built with SocketIO 4.
        </p>
      </div>
    </div>
  );
}
