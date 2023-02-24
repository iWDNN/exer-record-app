import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../hooks";
const ExerLog = styled.section`
  ul {
    li {
      display: flex;
      margin: 1em 0;
      span {
        margin: 0 10px;
        span:first-child {
          margin-right: 10px;
        }
      }
    }
  }
`;
// id: string;
//   date: string;
//   name: string;
//   allTime: number;
//   detailTimes: number[];
//   playSetCount: number;
//   setCount: number;
//   setRestTerm: number;
//   exerCount: number;
//   cmp: boolean;
export default function ExerLogs() {
  const { records } = useAppSelector((state) => state.exerLogs);
  console.log(records);
  return (
    <ExerLog>
      <h2>운동 기록</h2>
      <ul>
        {records?.map(
          ({ id, date, name, exerCount, playSetCount, setCount }) => (
            <li key={id}>
              <span>{date}</span>
              <span>{name}</span>
              <span>{exerCount}</span>
              <span>
                {playSetCount}/{setCount}
              </span>
            </li>
          )
        )}
      </ul>
    </ExerLog>
  );
}
