import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ContextPovider from "./Context/ContextPovider";

// Register service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then((registration) => {
                console.log("ServiceWorker registration successful");
            })
            .catch((err) => {
                console.log("ServiceWorker registration failed: ", err);
            });
    });
}

ReactDOM.render(
    // <React.StrictMode>
    <BrowserRouter>
        <ContextPovider>
            <App />
        </ContextPovider>
    </BrowserRouter>,
    /* </React.StrictMode>, */
    document.getElementById("root")
);

// Report web vitals in production
if (process.env.NODE_ENV === "production") {
    reportWebVitals(console.log);
}
