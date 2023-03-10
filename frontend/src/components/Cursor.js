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
const Cursor = ({ cursorPos, charId }) => {
  const cursorStyle = {
    left: cursorPos.left,
    width: "3px",
    height: cursorPos.height,
    top: cursorPos.top,
    backgroundColor: "white",
    position: "absolute",
    transition: "left 0.1s",
    borderRadius: "6px",
  };
  if(charId === 0) {
    cursorStyle.animation =  `${blinkAnimation} 1s infinite ease`
  }
  return (
    <Box
      sx={{
        ...cursorStyle
      }}
      id="cursor"
    />
  );
};
export { Cursor };
