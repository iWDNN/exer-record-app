import React from "react";
import ReactApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";

const Ct = styled.div`
  width: 100%;
  background-color: #555;
  section {
    width: 500px;
    color: #000;
  }
`;

export default function LabDetail() {
  const { exerId } = useParams();
  const exerLogs = useAppSelector((state) => state.exerLogs).filter(
    (exer) => exer.exerId === exerId
  );

  return (
    <Ct>
      <h2>{exerLogs[0].exerName}</h2>
      <section>
        <ReactApexChart
          type="line"
          options={{}}
          series={[
            {
              name: "exerCount",
              data: exerLogs.map((exer) => exer.performedSetCount),
            },
          ]}
        />
      </section>
    </Ct>
  );
}
