import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const _makeAverage = (arr) => {
  return Math.round(
    arr.reduce((acc, cur) => {
      acc = acc + cur;
      return acc;
    }, 0) / arr.length
  );
};

const TotalBar = (props) => {
  const { data } = props;
  const chartData = useMemo(() => {
    let labels = [];
    let values = [];
    for (const [key, value] of Object.entries(data)) {
      labels.push(key);
      values.push(_makeAverage(value));
    }
    return {
      labels,
      values,
    };
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
          categories: chartData.labels,
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
          data: chartData.values,
        },
      ]}
      type="bar"
      height={350}
    />
  );
};
export default TotalBar;
