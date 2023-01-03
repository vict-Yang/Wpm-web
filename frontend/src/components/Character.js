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
});
const NotReachCharacter = styled(Typography)({
  ...charBasicStype,
});
const Character = memo(
  ({ char, isNext, charTyped, id, cursorRef }) => {
    let ShowCharacter;
    if (isNext) {
      ShowCharacter = NextCharacter;
    } else if (charTyped === undefined) {
      ShowCharacter = NotReachCharacter;
    } else if (charTyped === char) {
      ShowCharacter = CorrectCharacter;
    } else {
      ShowCharacter = IncorrectCharacter;
    }
    return (
      <ShowCharacter
        ref={isNext ? cursorRef : null}
        fontFamily="monospace"
        variant="h4"
        color={"textSecondary"}
        id={id}
      >
        {char}
      </ShowCharacter>
    );
  },
  (props, nextProps) => {
    if (
      props.char !== nextProps.char ||
      props.isNext !== nextProps.isNext ||
      props.charTyped !== nextProps.charTyped
    )
      return false;
    return true;
  }
);
export { Character };
