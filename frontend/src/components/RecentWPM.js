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
  const RecentWPM = ({ profileUser }) => {

    const records = profileUser.recentWPM

    let data = []

    for(let record of records){
      const [date, time] = record.time.split("T")
      data.push({
        date: date,
        time: time,
        WPM: record.WPM
      })
    }

    while(data.length<10){
      data.unshift({
        date: records.length-10,
        time: records.length-10,
        WPM: 0
      })
    }

    return (
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey={"time"}>
          <Label value="time" offset={-5} position="insideBottomRight" />
        </XAxis>
        <YAxis>
          <Label value="WPM" offset={0} angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Legend/>
        <Line type="monotone" dataKey={"WPM"} stroke="#8884d8" strokeWidth={3}/>
      </LineChart>
    );
  };
  export { RecentWPM };
  