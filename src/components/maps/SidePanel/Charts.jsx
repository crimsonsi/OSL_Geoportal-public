import MyPie from "./Others/MyPie";
import Barchart from "./Others/MyBarChart";
import { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { compose } from "ol/transform";

export default function Charts(props) {
  const [showBarChart, setShowBarChart] = useState(false);
  const [reload, setReload] = useState(false);
  const [showing, setShowing] = useState("Pie Chart");
  const piechrt = useRef(null);
  const barchrt = useRef(null);

  useEffect(() => {
    if (piechrt.current) {
      htmlToImage
        .toPng(piechrt.current)
        .then(function (dataUrl) {
          props.setPChartImgUrl(dataUrl);
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    }
    if (barchrt.current) {
      htmlToImage
        .toPng(barchrt.current)
        .then(function (dataUrl) {
          props.setBChartImgUrl(dataUrl);
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    }
  }, [props.pChartImgUrl, props.bChartImgUrl, reload]);

  const pieChart = () => {
    setShowBarChart(false);
  };

  const barChart = () => {
    setShowBarChart(true);
  };

  const Button = (params) => {
    return (
      <button
        onClick={() => {
          setShowing(params.txt);
          params.handleClick();
        }}
        style={{ backgroundColor: showing === params.txt ? "#74465c" : "gray" }}
      >
        {params.txt}
      </button>
    );
  };

  return (
    <div className="charts">
      <h4>Charts</h4>
      <hr />
      <div className="scr">
        <Button handleClick={pieChart} txt="Pie Chart" />
        <Button handleClick={barChart} txt="Bar Graph" />
      </div>
      <div className="area">
        {!showBarChart && (
          <MyPie
            reload={reload}
            setReload={setReload}
            ref={piechrt}
            body={props.body}
          />
        )}
        {showBarChart && (
          <Barchart
            reload={reload}
            setReload={setReload}
            ref={barchrt}
            body={props.body}
          />
        )}
      </div>
    </div>
  );
}
