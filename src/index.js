import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DeadlineContextProvider } from "./context/DeadlineContest";
import { AuthContextProvider } from "./context/authcontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DeadlineContextProvider>
        <App />
      </DeadlineContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
