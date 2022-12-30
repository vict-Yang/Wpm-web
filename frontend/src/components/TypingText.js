import { Character } from "./Character";
import { Box, Fade, Collapse, Grow } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
const isVisible = (lineIdx, cursorLineIdx) => {
  if (cursorLineIdx === 0) {
    return lineIdx - cursorLineIdx <= 2;
  }
  return Math.abs(lineIdx - cursorLineIdx) <= 1;
};
const TypingText = ({ charsTyped, targetText, cursorLineIdx }) => {
  let charIdx = -1;
  return (
    <>
      <Box mt={5}>
        {targetText.split("\n").map((line, lIdx) => (
          <Collapse
            in={isVisible(lIdx, cursorLineIdx)}
            unmountOnExit
            mountOnEnter
            timeout={{ enter: 250, exit: 250 }}
          >
            <Fade
              in={isVisible(lIdx, cursorLineIdx)}
              timeout={{ enter: 500, exit: 200 }}
            >
              <Box>
                {line.split("").map((char) => {
                  charIdx += 1;
                  return (
                    <Character
                      key={charIdx}
                      char={char}
                      id={charIdx}
                      charsTyped={charsTyped}
                    />
                  );
                })}
              </Box>
            </Fade>
          </Collapse>
        ))}
      </Box>
    </>
  );
};
export { TypingText };
