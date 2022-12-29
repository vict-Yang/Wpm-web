import { Typography } from "@mui/material";
import { styled } from "@mui/system";
const charBasicStype = {
  display: "inline-block",
  whiteSpace: "pre",
};
const IncorrectCharacter = styled(Typography)({
  ...charBasicStype,
  color: "#CC0000",
  textDecoration: "underline",
});
const CorrectCharacter =  styled(Typography)({
  ...charBasicStype,
  color: "#008000",

});
const NextCharacter = styled(Typography)({
  ...charBasicStype,
  background: "#A8A8A8",
  
});
const NotReachCharacter = styled(Typography)({
  ...charBasicStype,
})
const Character = ({ char, id, charsTyped }) => {
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
  return <ShowCharacter variant="h5" color={"textSecondary"}>{char}</ShowCharacter>;
};
export { Character };
