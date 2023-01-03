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

  const wrapperStyle = {
    color: "blue",
    backgroundColor: "blue"
  };

  const RecentWPM = ({ recentWPM }) => {
    let data = []
    for(let record of recentWPM){
      const [date, time] = record.time.split("T")
      data.push({
        date: date,
        time: time,
        WPM: record.WPM
      })
    }
    while(data.length<10){
      data.unshift({
        WPM: 0
      })
    }
    return (
      <LineChart width={1400} height={500} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey={"date"}>
          <Label value="time" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="WPM" offset={5} angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip wrapperStyle={wrapperStyle}/>
        <Line type="monotone" dataKey={"WPM"} stroke="#8884d8" strokeWidth={3}/>
      </LineChart>
    );
  };
  export { RecentWPM };
  