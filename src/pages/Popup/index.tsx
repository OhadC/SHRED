import React from "react";
import { createRoot } from "react-dom/client";
import { PopupComponent } from "./Popup";
import "./global-styles.scss";

const rootDiv = document.querySelector("#app-container")!;
const root = createRoot(rootDiv);

root.render(
    <React.StrictMode>
        <PopupComponent />
    </React.StrictMode>
);
