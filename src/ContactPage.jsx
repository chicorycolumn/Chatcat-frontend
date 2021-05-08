import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/ContactPage.module.css";

const roomUtils = require("./utils/roomUtils.js");
const browserUtils = require("./utils/browserUtils.js");
const displayUtils = require("./utils/displayUtils.js");
const gameUtils = require("./utils/gameUtils.js");

export default function ContactPage() {
  return (
    <div className={`${styles.ContactPage}`}>
      <p>Contact details...</p>
    </div>
  );
}
