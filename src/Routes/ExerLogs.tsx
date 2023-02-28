import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { resetLog } from "../features/exercise/exerLogsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { EXER_LOGS } from "../ls-type";
const ExerLogList = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  button:first-child {
    border: none;
    border-radius: 7px;
    padding: 0.75em 1em;
    margin: 1em 0;
    cursor: pointer;
  }
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
      font-size: 0.8em;
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
  const dispatch = useAppDispatch();
  const onClickReset = () => {
    localStorage.setItem(EXER_LOGS, JSON.stringify([]));
    dispatch(resetLog());
  };
  return (
    <ExerLogList>
      <button onClick={onClickReset}>초기화</button>
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
