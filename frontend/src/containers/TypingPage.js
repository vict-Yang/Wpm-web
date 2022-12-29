import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useKeyPress } from "./hooks/useKeyPress";
import { useCountDown } from "./hooks/useCountDown";
import { TypingText } from "../components/TypingText";
import { Timer } from "../components/Timer";
import { WpmLineChart } from "../components/WpmLineChart";
const MaxTime = 10;
const SecondToMinute = 1 / 60;
const MaxCharPerLine = 60;
const calculateCorrectWord = (targetText, charsTyped) => {
  let ret = 0;
  let targetTextWordArray = targetText.split(/[\n\s]+/);
  let charsTypedWordArray = charsTyped.split(/[\n\s]+/);
  console.log("wordarray1", targetTextWordArray);
  console.log("wordarray2", charsTypedWordArray);
  charsTypedWordArray.forEach((word, idx) => {
    if (
      idx < targetTextWordArray.length &&
      targetTextWordArray[idx] === word &&
      targetTextWordArray[idx] !== " "
    )
      ret++;
  });
  return ret;
};
const reformatTargetText = (targetText) => {
  let ret = JSON.parse(JSON.stringify(targetText.replace("\n", " ").split("")));
  let idx = targetText.indexOf(" ");
  let linePos = idx;
  while (idx < targetText.length && idx !== -1) {
    const nextSpace = targetText.indexOf(" ", idx + 1);
    console.log(
      "idx = ",
      idx,
      "linePos = ",
      linePos,
      "nextSpace = ",
      nextSpace
    );
    if (nextSpace === -1) break;
    if (linePos + (nextSpace - idx) - 1>= MaxCharPerLine) {
      console.log("replace");
      ret[idx] = "\n";
      linePos = (nextSpace - idx);
    } else {
      linePos += nextSpace - idx;
    }
    idx = nextSpace;
  }
  console.log(ret.join(""));
  return ret.join("");
};
const TypingPage = ({ targetText }) => {
  const [charsTyped, setCharTyped] = useState([]);
  const { countDown, startCountDown } = useCountDown(MaxTime);
  const [wpmPerSecond, setWpmPerSecond] = useState([]);
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
    if (charsTyped.length > 0) {
      startCountDown();
    }
  }, [charsTyped]);
  useEffect(() => {
    if (countDown !== MaxTime) {
      const wordCnt = calculateCorrectWord(targetText, charsTyped.join(""));
      setWpmPerSecond((pre) => [
        ...pre,
        {
          second: MaxTime - countDown,
          wpm: wordCnt / ((MaxTime - countDown) * SecondToMinute),
        },
      ]);
    }
    // console.log(targetText);
  }, [countDown]);
  return (
    <>
      <Container>
        <Timer time={MaxTime - countDown} MaxTime={MaxTime} />
        <TypingText
          charsTyped={charsTyped}
          targetText={reformatTargetText(targetText)}
        />
        {countDown === 0 ? (
          <WpmLineChart
            xDataKey={"second"}
            dataKey={"wpm"}
            data={wpmPerSecond}
          />
        ) : (
          ""
        )}
      </Container>
    </>
  );
};
export { TypingPage };
