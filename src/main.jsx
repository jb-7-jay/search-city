// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Commenting out strict mode to test the API integration, as API's are calling twice in useEffect
  // API endpoint serve's only 1 request per second

  //   <React.StrictMode>
  <App />
  // </React.StrictMode>
);
