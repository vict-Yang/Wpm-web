import React from "react";
import ReactDOM from "react-dom/client";
import { TypingPage } from "./containers/TypingPage";
const root = ReactDOM.createRoot(document.getElementById("root"));
const targetText = `Please use this GitHub issue or this anonymous form for high-level feedback. 
If you spot something that doesn’t make sense, please tell us! Additionally, 
each page has thumbs up/down buttons in the corner.
`;
root.render(
  <React.StrictMode>
    <TypingPage targetText={targetText} />
  </React.StrictMode>
);
