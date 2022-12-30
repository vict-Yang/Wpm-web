import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0
  }

  100% {
    opacity: 1;
  }
`;
const Cursor = ({ cursorPos , charId}) => {
  return (
    <Box
      sx={{
        left: cursorPos.left,
        width: "2.4px",
        height: cursorPos.height,
        top: cursorPos.top,
        backgroundColor: "black",
        position: "absolute",
        transition: "left 0.1s",
        animation: `${blinkAnimation} ${charId ===0 ? 1 : 0}s infinite ease`,
      }}
      id="cursor"
    />
  );
};
export { Cursor };
