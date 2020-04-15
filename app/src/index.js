import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.Fragment>
    <Header />
    <App />
  </React.Fragment>,
  document.getElementById("root")
);

serviceWorker.unregister();
