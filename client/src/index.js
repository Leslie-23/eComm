import React from "react";
import { createRoot } from "react-dom/client"; // React 18+ method
import App from "./App";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./Store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Options for react-alert
const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE,
};

// Create the root element for React 18+
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render the application
root.render(
  <Provider store={Store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);

// import React from "react";
// import ReactDOM from "react-dom";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import { Provider } from "react-redux";
// import Store from "./Store";
// import { positions, transitions, Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";

// const options = {
//   timeout: 5000,
//   position: positions.BOTTOM_CENTER,
//   transitions: transitions.SCALE,
// };

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   //<React.StrictMode>
//   <Provider store={Store}>
//     <AlertProvider template={AlertTemplate} {...options}>
//       <App />
//     </AlertProvider>
//   </Provider>
//   // </React.StrictMode>
// );
