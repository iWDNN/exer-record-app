import React from "react";
import ReactApexChart from "react-apexcharts";

export default function ExerLabsItem() {
  return (
    <>
      <li>
        <h2>횟수 증가 그래프</h2>
        <ReactApexChart
          type="line"
          options={{}}
          series={[
            {
              name: "hello",
              data: [4, 1, 5, 6, 4, 6],
            },
          ]}
        />
      </li>
      <li>
        <h2>걸린 시간 그래프</h2>
      </li>
      <li>
        <h2>세트 수 그래프</h2>
      </li>
    </>
  );
}
