import { useEffect, useState } from "react";
import { Container, Modal, Box, Button } from "@mui/material";
import { useKeyPress } from "./hooks/useKeyPress";
import { useCountDown } from "./hooks/useCountDown";
import { TypingText } from "../components/TypingText";
import { Timer } from "../components/Timer";
import { WpmLineChart } from "../components/WpmLineChart";
const MaxTime = 5;
const SecondToMinute = 1 / 60;
const MaxCharPerLine = 55;
const calculateCorrectWord = (targetText, charsTyped) => {
  let ret = 0,
    idx = 0;
  let targetTextWordArray = targetText.split(/[\n\s]+/);
  targetTextWordArray.forEach((word) => {
    let same = true;
    word.split("").forEach((char) => {
      if (char !== charsTyped[idx]) {
        same = false;
      }
      idx++;
    });
    if (same) ret++;
    idx++;
  });
  return ret;
};
const reformatTargetText = (targetText) => {
  let ret = JSON.parse(
    JSON.stringify(targetText.replaceAll("\n", " ").split(""))
  );
  let idx = targetText.indexOf(" ");
  let linePos = idx;
  while (idx < targetText.length && idx !== -1) {
    const nextSpace = targetText.indexOf(" ", idx + 1);
    // console.log(
    //   "idx = ",
    //   idx,
    //   "linePos = ",
    //   linePos,
    //   "nextSpace = ",
    //   nextSpace
    // );
    if (nextSpace === -1) break;
    if (linePos + (nextSpace - idx) - 1 >= MaxCharPerLine) {
      // console.log("replace");
      ret[idx] = "\n";
      linePos = nextSpace - idx;
    } else {
      linePos += nextSpace - idx;
    }
    idx = nextSpace;
  }
  // console.log(ret.join(""));
  return ret.join("").replaceAll("\n", " \n");
};
const getNewLineIdx = (targetText, idx) => {
  const formatedText = reformatTargetText(targetText).replaceAll(" \n", "\n");
  let ret = 0;
  for (let i in formatedText) {
    if (i >= idx) break;
    if (formatedText[i] === "\n") ret++;
  }
  return ret;
};
const TypingPage = ({ targetText }) => {
  const [charsTyped, setCharTyped] = useState([]);
  const { countDown, startCountDown, setCountDown ,setStart} = useCountDown(MaxTime);
  const [wpmPerSecond, setWpmPerSecond] = useState([]);
  const [cursorLineIdx, setLineIdx] = useState(0);
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
    const newLineIdx = getNewLineIdx(targetText, charsTyped.length);
    if (newLineIdx !== cursorLineIdx) setLineIdx(newLineIdx);
  }, [charsTyped]);
  useEffect(() => {
    if (countDown !== MaxTime) {
      const wordCnt = calculateCorrectWord(targetText, charsTyped.join(""));
      console.log("wordCnt = ", wordCnt);
      setWpmPerSecond((pre) => [
        ...pre,
        {
          second: MaxTime - countDown,
          wpm: wordCnt / ((MaxTime - countDown) * SecondToMinute),
        },
      ]);
    }
    console.log("cursorLineIdx = ", cursorLineIdx);
  }, [countDown]);
  return (
    <>
      <Modal
        open={countDown === 0}
        sx={{
          backdropFilter: "blur(3px)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 5,
            borderWidth: 0,
          }}
        >
          <WpmLineChart
            xDataKey={"second"}
            dataKey={"wpm"}
            data={wpmPerSecond}
          />
          <Button
            variant="outlined"
            sx={{ mr: "5px" }}
            onClick={() => {
              setCharTyped([]);
              setCountDown(MaxTime);
              setStart(false);
              setWpmPerSecond([]);
            }}
          >
            Retry
          </Button>
          <Button variant="outlined">New text</Button>
        </Box>
      </Modal>
      <Container>
        <Timer time={MaxTime - countDown} MaxTime={MaxTime} />
        <TypingText
          charsTyped={charsTyped}
          targetText={reformatTargetText(targetText)}
          cursorLineIdx={cursorLineIdx}
        />
      </Container>
    </>
  );
};
export { TypingPage };
