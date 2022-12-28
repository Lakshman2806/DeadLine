import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DeadlineContextProvider } from "./context/DeadlineContest";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DeadlineContextProvider>
      <App />
    </DeadlineContextProvider>
  </React.StrictMode>
);
