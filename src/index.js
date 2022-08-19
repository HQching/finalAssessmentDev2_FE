import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { FronteggProvider } from "@frontegg/react";
// require('dotenv').config();
// const baseUrl = process.env.REACT_APP_BASEURL;
// const clientID = process.env.REACT_APP_CLIENTID;

const contextOptions = {//unique for each project
  baseUrl: process.env.REACT_APP_BASEURL,
  clientId: process.env.REACT_APP_BASEURL
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>>
    <App />
  </FronteggProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
