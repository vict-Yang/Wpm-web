import { Character } from "./Character";
import { Box } from "@mui/material";
const TypingText = ({ charsTyped, targetText }) => {
  let charIdx = -1;
  return (
    <>
      <Box
      >
        {targetText.split("\n").map((line, lineIdx) => (
          <Box key={lineIdx}>
            {line
              .split("")
              .map((char) => {
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
        ))}
      </Box>
    </>
  );
};
export { TypingText };
