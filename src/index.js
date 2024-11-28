import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const chat = document.createElement("chat-embed");
document.body.appendChild(chat);
const root = ReactDOM.createRoot(chat);
root.render(<App />);
