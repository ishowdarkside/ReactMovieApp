import ReactDOM from "react-dom/client";
import { StrictMode, useState } from "react";
import PropTypes from "prop-types";
import App from "./App-v1";
import "./index.css";
import StarRating from "./StarRating";
const root = ReactDOM.createRoot(document.querySelector("#root"));

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  defaultRating: PropTypes.number,
  messages: PropTypes.array,
  onSetRating: PropTypes.func,
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
