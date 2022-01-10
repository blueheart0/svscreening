import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const MonthlyBar = (props) => {
  const { data = new Map() } = props;
  console.log("data", data);
  const chartData = useMemo(() => {
    let label = {};
    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }
  }, [data]);

  return (
    <ReactApexChart
      options={{
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"],
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true,
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
        colors: [
          "#33b2df",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
        ],
      }}
      series={[
        {
          data: [
            // _makeAverage(state.result?.pedestrian),
            // _makeAverage(state.result?.rider),
            // _makeAverage(state.result?.truck),
            // _makeAverage(state.result?.cyclist),
            // _makeAverage(state.result?.forklift),
            // _makeAverage(state.result?.car),
          ],
        },
      ]}
      type="bar"
      height={350}
    />
  );
};
export default MonthlyBar;
