import React, { useEffect, useState } from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import MyError from "../../../Utils/MyError";

export default function MyPie(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.body.style.classes?.length > 0) {
      let d = [];
      props.body.style.classes.forEach((item) => {
        d.push({ name: item.name, value: item.count, fill: item.color });
      });
      setData(d);
    }
  }, [props.body.style.classes]);

  return (
    <>
      {data.length > 0 ? (
        <ResponsiveContainer width="99%" aspect={1.5} >
          <PieChart width="100%" height="100%">
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="40%"
              innerRadius="40%"
              outerRadius="60%"
              fill="#82ca9d"
              label
            />
            <Tooltip />
            <Legend verticalAlign="bottom" height="20%" />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <MyError
          txt="No charts to display at the moment. Go to layers to style your
        data"
        />
      )}
    </>
  );
}
