import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { memo } from "react";
const charBasicStype = {
  display: "inline-block",
  whiteSpace: "pre",
};
const IncorrectCharacter = styled(Typography)({
  ...charBasicStype,
  color: "#CC0000",
  textDecoration: "underline",
});
const CorrectCharacter = styled(Typography)({
  ...charBasicStype,
  color: "#008000",
});
const NextCharacter = styled(Typography)({
  ...charBasicStype,
  background: "#A8A8A8",
});
const NotReachCharacter = styled(Typography)({
  ...charBasicStype,
});
const Character = memo(
  ({ char, id, charsTyped }) => {
    let ShowCharacter;
    if (id == charsTyped.length) {
      ShowCharacter = NextCharacter;
    } else if (id >= charsTyped.length) {
      ShowCharacter = NotReachCharacter;
    } else if (charsTyped[id] === char) {
      ShowCharacter = CorrectCharacter;
    } else {
      ShowCharacter = IncorrectCharacter;
    }
    return (
      <ShowCharacter variant="h4" color={"textSecondary"}>
        {char}
      </ShowCharacter>
    );
  },
  (props, nextProps) => {
    if (
      props.id == nextProps.charsTyped.length - 1 ||
      props.id == nextProps.charsTyped.length ||
      props.id == nextProps.charsTyped.length + 1
    ) {
      // Return false to re-render
      return false;
    } else {
      // Return true to avoid re-render
      return true;
    }
  }
);
export { Character };
