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
// suppose the data is [{second: 1, wpm: 10}, {second: 2: wpm: 20}]
// dataKey is wpm, xDataKey is second
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
      <Tooltip />
      <Legend/>
      <Line type="monotone" dataKey={"wpm"} stroke="#8884d8" strokeWidth={3}/>
      <Line type="monotone" dataKey={"raw"} stroke="#82ca9d" strokeWidth={3}/>
    </LineChart>
  );
};
export { WpmLineChart };
