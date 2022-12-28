import { Typography } from "@mui/material";
const IncorrectCharacter = ({ char }) => {
  return (
    <Typography
      sx={{
        color: "#CC0000",
        textDecoration: "underline",
        textDecorationStyle: "wavy",
        display: "inline-block",
        whiteSpace: "pre",
      }}
    >
      {char}
    </Typography>
  );
};
const CorrectCharacter = ({ char }) => {
  return (
    <Typography
      sx={{
        color: "#008000",
        display: "inline-block",
        whiteSpace: "pre",
      }}
    >
      {char}
    </Typography>
  );
};
const NextCharacter = ({ char }) => {
  return (
    <Typography
      color={"textSecondary"}
      sx={{
        display: "inline-block",
        whiteSpace: "pre",
        background: "#A8A8A8"
      }}
    >
      {char}
    </Typography>
  );
};
const NotReachedCharacter = ({ char }) => {
  return (
    <Typography
      color={"textSecondary"}
      sx={{
        display: "inline-block",
        whiteSpace: "pre"
      }}
    >
      {char}
    </Typography>
  );
};
const Character = ({ char, id, charsTyped }) => {
  let ShowCharacter;
  if (id == charsTyped.length) {
    ShowCharacter = NextCharacter;
  } else if (id >= charsTyped.length) {
    ShowCharacter = NotReachedCharacter;
  } else if (charsTyped[id] === char) {
    ShowCharacter = CorrectCharacter;
  } else {
    ShowCharacter = IncorrectCharacter;
  }
  return <ShowCharacter char={char}></ShowCharacter>;
};
export { Character };
