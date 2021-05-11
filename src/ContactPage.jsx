import React from "react";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import a from "./css/Animations.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/ContactPage.module.css";

import * as roomUtils from "./utils/roomUtils.js";
import * as browserUtils from "./utils/browserUtils.js";
import * as displayUtils from "./utils/displayUtils.js";
import * as gameUtils from "./utils/gameUtils.js";

export default function ContactPage() {
  return (
    <div className={`${styles.ContactPage}`}>
      <p>Contact details...</p>
    </div>
  );
}
