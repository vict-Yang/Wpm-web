import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useKeyPress } from "./hooks/useKeyPress";
import { TypingText } from "../components/TypingText";
const TypingPage = ({ targetText }) => {
  const [charTyped, setCharTyped] = useState([]);
  useKeyPress((key) => {
    if (key != "Backspace") {
      setCharTyped((prevCharsTyped) => [...prevCharsTyped, key]);
    } else {
      setCharTyped((prevCharsTyped) =>
        prevCharsTyped.filter((_, i) => i != prevCharsTyped.length - 1)
      );
    }
  });
  return (
    <>
      <Box>
        <Typography>some information</Typography>
      </Box>
      <TypingText charsTyped={charTyped} targetText={targetText}/>
    </>
  );
};
export { TypingPage };
