import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../hooks";
const ExerLogList = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  ul {
    width: 90%;
    li {
      display: grid;
      grid-template-columns: 40% 25% 15% 15% 5%;
      &:first-child {
        font-size: 0.8em;
        span {
          place-self: center;
        }
      }
    }
  }
`;

const ExerLogItem = styled.li`
  display: flex;
  padding: 0.7em 0;
  margin: 1em 0;
  border-radius: 7px;
  span {
    place-self: center;
    margin: 0 10px;
    font-size: 0.9em;
    &:first-child {
      font-size: 0.9em;
    }
  }
`;

const IsCmp = styled.div<{ isCmp: boolean }>`
  color: ${(props) => (props.isCmp ? props.theme.green : props.theme.red)};
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
  const records = useAppSelector((state) => state.exerLogs);
  return (
    <ExerLogList>
      <ul>
        <li>
          <span>날짜</span>
          <span>이름</span>
          <span>횟수</span>
          <span>세트 수</span>
        </li>
        {records?.map(
          ({ id, date, name, cmp, exerCount, playSetCount, setCount }) => (
            <ExerLogItem key={id}>
              <span>{date}</span>
              <span>{name}</span>
              <span>{exerCount}</span>
              <span>
                {playSetCount}/{setCount}
              </span>
              <IsCmp isCmp={cmp}>
                <i className="fa-solid fa-check"></i>
              </IsCmp>
            </ExerLogItem>
          )
        )}
      </ul>
    </ExerLogList>
  );
}
