import { Character } from "./Character";
import { Box, Fade, Collapse } from "@mui/material";
const isVisible = (lineIdx, cursorLineIdx) => {
  if (cursorLineIdx === 0) {
    return lineIdx - cursorLineIdx <= 2;
  }
  return Math.abs(lineIdx - cursorLineIdx) <= 1;
};
const TypingText = ({ charsTyped, targetText, cursorLineIdx , cursorRef}) => {
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
              <Box
          sx={{
            mt: 2,
            mb: 2,
          }}
              >
                {line.split("").map((char) => {
                  charIdx += 1;
                  return (
                    <Character
                      id={charIdx}
                      key={charIdx}
                      char={char}
                      charTyped={charsTyped[charIdx]}
                      isNext={charIdx === charsTyped.length}
                      cursorRef={cursorRef}
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
