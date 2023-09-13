import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";

import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/css/argon-dashboard-react.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
);
