import React from "react";
import ReactDOM from "react-dom";

import { PopupComponent } from "./Popup";
import "./global-styles.scss";

ReactDOM.render(<PopupComponent />, window.document.querySelector("#app-container"));

if (module.hot) module.hot.accept();
