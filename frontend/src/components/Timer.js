import { LinearProgress, Box, Typography } from "@mui/material";
const Timer = ({ time, MaxTime }) => {
  return (
    <Box>
      <Typography>{MaxTime - time}</Typography>
      <LinearProgress
        variant="determinate"
        value={(time / MaxTime) * 100}
      />
    </Box>
  );
};
export { Timer };
