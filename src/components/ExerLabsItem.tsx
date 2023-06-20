import React from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { IExerIdName } from "../redux/exercise/exerLogsSlice";
import { useAppSelector } from "../redux/hooks";

interface IExerLabsItemProps {
  exerInfo: IExerIdName;
}

const Ct = styled.div`
  padding: 1em;
  background-color: #373737;
  & > div {
  }
  & > div:nth-child(1) {
  }
  & > div:nth-child(2) {
    & > div:nth-child(2) {
      color: #000;
    }
  }
`;

export default function ExerLabsItem({ exerInfo }: IExerLabsItemProps) {
  const exerLogs = useAppSelector((state) => state.exerLogs).filter(
    (exer) => exer.exerId === exerInfo.id
  );
  return (
    <Ct>
      <div>
        <h1>{exerInfo.name}</h1>
      </div>
      <div></div>
    </Ct>
  );
}
