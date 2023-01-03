import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";
// suppose the data is [{second: 1, wpm: 10}, {second: 2: wpm: 20}]
// dataKey is wpm, xDataKey is second
const CustomTooltip = ({ active, payload, label }) => {
  console.log("payload", payload);
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: "rgba(57, 62, 70, 0.5)",
        }}
      >
        <Typography variant="h4"> {label} </Typography>
        <Typography
          sx={{ color: payload[0].color }}
          variant="h4"
        >{`${payload[0].dataKey} : ${payload[0].value}`}</Typography>
        <Typography
          sx={{ color: payload[1].color }}
          variant="h4"
        >{`${payload[1].dataKey} : ${payload[1].value}`}</Typography>
      </Box>
    );
  }
};
const WpmLineChart = ({ data }) => {
  return (
    <LineChart width={1000} height={400} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey={"second"}>
        <Label value="second" offset={-5} position="insideBottomRight" />
      </XAxis>
      <YAxis>
        <Label value="wpm" offset={0} angle={-90} position="insideLeft" />
      </YAxis>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line type="monotone" dataKey={"wpm"} stroke="#8884d8" strokeWidth={3} />
      <Line type="monotone" dataKey={"raw"} stroke="#82ca9d" strokeWidth={3} />
    </LineChart>
  );
};
export { WpmLineChart };
