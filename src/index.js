import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Global.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
);
