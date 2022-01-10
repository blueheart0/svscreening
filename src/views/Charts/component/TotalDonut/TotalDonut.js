import React from "react";
import ReactApexChart from "react-apexcharts";

const STATUS = {
  READY: "Ready",
  IN_PROGRESS: "In-Progress",
  FINISHED: "Finished",
};

const TotalDonut = (props) => {
  const { data } = props;

  return (
    <ReactApexChart
      options={{
        chart: {
          type: "donut",
        },
        labels: [STATUS.READY, STATUS.IN_PROGRESS, STATUS.FINISHED],
      }}
      series={data}
      type="donut"
      height={350}
    />
  );
};

export default TotalDonut;
