import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Label,
    Tooltip,
    Legend
} from "recharts";
import { Box, Typography } from "@mui/material";
const moment = require("moment-timezone");
  
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: "rgba(57, 62, 70, 0.5)"
        }}
      >
        {!label? <></> : 
        <Typography variant="h4"> {label} </Typography>}
        {!payload[0].payload.time? <></> : 
        <Typography
          sx={{ color: "white"}}
          variant="h4"
        >{`${payload[0].payload.time}`}</Typography>}
        <Typography
          sx={{ color: payload[0].color}}
          variant="h4"
        >{`wpm: ${payload[0].value}`}</Typography>
      </Box>
    );
  }
};
const RecentWPM = ({ recentWPM }) => {
  let data = []
  for(let record of recentWPM){
    const [date, time] = moment(record.time).local().format().split("T")
    data.push({
      date: date,
      time: time.split(".")[0].split(/[+-]/)[0],
      WPM: record.WPM
    })
  }
  while(data.length<10){
    data.unshift({
      WPM: 0
    })
  }
  return (
    <LineChart width={1000} height={450} data={data} margin={{right: 60, bottom: 30}}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey={"date"}>
        <Label value="time" offset={-20} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value="WPM" offset={10} angle={-90} position="insideLeft" />
      </YAxis>
      <Tooltip content={<CustomTooltip />} />
      <Line type="monotone" dataKey={"WPM"} stroke="#8884d8" strokeWidth={3}/>
    </LineChart>
  );
};
export { RecentWPM };
