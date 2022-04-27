import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import store from "./redux/store";

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Eliminando el StricMode evito que el componente se renderice 2 veces
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
