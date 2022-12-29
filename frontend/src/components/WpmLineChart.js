import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label , Tooltip} from "recharts";
// suppose the data is [{second: 1, wpm: 10}, {second: 2: wpm: 20}]
// dataKey is wpm, xDataKey is second
const WpmLineChart = ({ xDataKey, dataKey, data }) => {
  return (
    <LineChart width={900} height={300} data={data}>
      <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey={xDataKey}>
        <Label value="second" offset={0} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value="wpm" offset={0} angle={-90} position="insideLeft" />
      </YAxis>
      <Tooltip/>
    </LineChart>
  );
};
export { WpmLineChart };
