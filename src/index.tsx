import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./unused/reportWebVitals";
import * as serviceWorkerRegistration from "./unused/serviceWorkerRegistration";
// import "bootstrap/dist/css/bootstrap.css";

import store from "./_helpers/store";
import { Provider } from "react-redux";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
