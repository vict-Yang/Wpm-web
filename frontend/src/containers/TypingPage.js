import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useKeyPress } from "./hooks/useKeyPress";
import { useCountDown } from "./hooks/useCountDown";
import { TypingText } from "../components/TypingText";
import { Timer } from "../components/Timer";
const MaxTime = 10;
const TypingPage = ({ targetText }) => {
  const [charTyped, setCharTyped] = useState([]);
  const { countDown, startCountDown } = useCountDown(MaxTime);
  useKeyPress((key) => {
    if (key != "Backspace") {
      setCharTyped((prevCharsTyped) => [...prevCharsTyped, key]);
    } else {
      setCharTyped((prevCharsTyped) =>
        prevCharsTyped.filter((_, i) => i != prevCharsTyped.length - 1)
      );
    }
  });
  useEffect(() => {
    if (charTyped.length > 0) {
      startCountDown();
    }
  }, [charTyped]);
  return (
    <>
      <Container>
        <Timer time={MaxTime - countDown} MaxTime={MaxTime} />
        <TypingText charsTyped={charTyped} targetText={targetText} />
      </Container>
    </>
  );
};
export { TypingPage };
