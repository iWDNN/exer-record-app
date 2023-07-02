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
      <div>세트 완수율</div>
      <div>운동 시작한 날짜</div>
      <div>가장 최근에 운동한 날짜</div>
      <div>무게 추이도</div>
      <div>일주일 간 무게 증가량</div>
      <div>한 달 간 무게 증가량</div>
      <div>횟수 추이도</div>
      <div>일주일 간 횟수 증가량</div>
      <div>한 달 간 횟수 증가량</div>
    </Ct>
  );
}
