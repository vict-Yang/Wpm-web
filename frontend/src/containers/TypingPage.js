import { useEffect, useState, useRef, useCallback } from "react";
import { Container, Modal, Box, IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import { Replay, TextSnippet, Save } from "@mui/icons-material";
import { useKeyPress } from "./hooks/useKeyPress";
import { useCountDown } from "./hooks/useCountDown";
import { TypingText } from "../components/TypingText";
import { Timer } from "../components/Timer";
import { WpmLineChart } from "../components/WpmLineChart";
import LoadingModal from "../components/LoadingModal";
import { Cursor } from "../components/Cursor";
import { useAuthUser } from "react-auth-kit";
import axios from "../api";
const MaxTime = 10;
const SecondToMinute = 1 / 60;
const MaxCharPerLine = 55;
const calculateCorrectWord = (targetText, charsTyped) => {
  let wpm = 0,
    raw = 0,
    idx = 0;
  let targetTextWordArray = targetText.split(/[\n\s]+/);
  targetTextWordArray.every((word) => {
    if (idx >= charsTyped.length) {
      return false;
    }
    raw++;
    let same = true;
    word.split("").forEach((char) => {
      if (char !== charsTyped[idx]) {
        same = false;
      }
      idx++;
    });
    if (same) wpm++;
    if (charsTyped[idx] === undefined) raw--;
    idx++;
    return true;
  });
  return { wpm, raw };
};
const reformatTargetText = (targetText) => {
  let ret = JSON.parse(
    JSON.stringify(targetText.replaceAll("\n", " ").split(""))
  );
  let idx = targetText.indexOf(" ");
  let linePos = idx;
  while (idx < targetText.length && idx !== -1) {
    const nextSpace = targetText.indexOf(" ", idx + 1);
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
const TypingPage = () => {
  const [charsTyped, setCharTyped] = useState([]);
  const { countDown, startCountDown, setCountDown, setStart } =
    useCountDown(MaxTime);
  const [wpmPerSecond, setWpmPerSecond] = useState([]);
  const [cursorLineIdx, setLineIdx] = useState(0);
  const [cursorPos, setCursorPos] = useState({});
  const [targetText, setTargetText] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const cursorRef = useCallback(
    (cursor) => {
      //console.log("ref", cursor);
      if (cursor !== null) {
        setCursorPos((preCursorPos) => {
          let nextCursorPos = JSON.parse(
            JSON.stringify(cursor.getBoundingClientRect())
          );
          nextCursorPos.left =
            cursor.getBoundingClientRect().left -
            containerRef.current.getBoundingClientRect().left;
          nextCursorPos.top =
            cursor.getBoundingClientRect().top -
            containerRef.current.getBoundingClientRect().top;
          //console.log("cursorLineIdx in useCallback", cursorLineIdx);
          if (
            cursorLineIdx !== 0 &&
            !(cursorLineIdx === 1 && nextCursorPos.top < preCursorPos.top)
          ) {
            //console.log("not at first line");
            nextCursorPos.top = preCursorPos.top;
          }
          return nextCursorPos;
        });
      }
    },
    [cursorLineIdx]
  );
  const auth = useAuthUser();
  const getArticle = async () => {
    setLoading(true);
    const response = await axios.get("/article");
    setTargetText(response.data.string);
    setLoading(false);
  };
  const saveRecord = async () => {
    await axios.post("/record", {
      username: auth().name,
      WPM: parseFloat(wpmPerSecond[wpmPerSecond.length - 1].wpm),
    });
  };
  useEffect(() => {
    getArticle();
  }, []);
  /*
  useEffect(() => {
    console.log("ref", cursorRef.current);
  }, [cursorRef.current]);
  */
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
      const { wpm, raw } = calculateCorrectWord(
        targetText,
        charsTyped.join("")
      );
      setWpmPerSecond((pre) => [
        ...pre,
        {
          second: MaxTime - countDown,
          wpm: (wpm / ((MaxTime - countDown) * SecondToMinute)).toFixed(2),
          raw: (raw / ((MaxTime - countDown) * SecondToMinute)).toFixed(2),
        },
      ]);
    }
    //console.log("cursorLineIdx = ", cursorLineIdx);
  }, [countDown]);
  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert severity="success" sx={{ width: '100%' }} onClose={() => setOpen(false)}>
              Saved
          </Alert>
      </Snackbar>
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
          <Tooltip title="retry">
            <IconButton
              variant="outlined"
              sx={{ mr: "5px", mt: "-15px" }}
              onClick={() => {
                setCharTyped([]);
                setCountDown(MaxTime);
                setLineIdx(0);
                setStart(false);
                setWpmPerSecond([]);
              }}
            >
              <Replay />
            </IconButton>
          </Tooltip>
          <Tooltip title="new article">
            <IconButton
              variant="outlined"
              sx={{ mt: "-15px" }}
              onClick={() => {
                setCharTyped([]);
                setCountDown(MaxTime);
                setLineIdx(0);
                setStart(false);
                setWpmPerSecond([]);
                getArticle();
              }}
            >
              <TextSnippet />
            </IconButton>
          </Tooltip>
          <Tooltip title="save">
            <IconButton
              variant="outlined"
              sx={{ mt: "-15px" }}
              onClick={()=>{
                saveRecord()
                setOpen(true)
              }}
            >
              <Save />
            </IconButton>
          </Tooltip>
        </Box>
      </Modal>
      <Container
        ref={containerRef}
        sx={{
          mt: "75px",
          position: "relative",
        }}
      >
        <Cursor cursorPos={cursorPos} charId={charsTyped.length} />
        <Timer time={MaxTime - countDown} MaxTime={MaxTime} />
        <TypingText
          charsTyped={charsTyped}
          targetText={reformatTargetText(targetText)}
          cursorLineIdx={cursorLineIdx}
          cursorRef={cursorRef}
        />
        <LoadingModal open={loading} />
      </Container>
    </>
  );
};
export { TypingPage };
