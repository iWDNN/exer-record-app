import React from "react";
import styled from "styled-components";
import { resetLog } from "../redux/exercise/exerLogsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { EXER_LOGS } from "../ls-type";
import { formatTime } from "../utils";
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
`;
const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ListHeader = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 0.9em;
  font-weight: 700;
  background-color: #2a2527;
  padding: 0.8em 2em;
  border-bottom: 1px solid #4e494b;
  & > * {
    border-right: 1.5px solid #4e494b;
    border-radius: 1px;
    &:last-child {
      border-right: none;
    }
  }
  div:first-child {
    width: 200px;
  }
  div:nth-child(2) {
    flex-grow: 1;
  }
  div:nth-child(3) {
    display: flex;
    align-items: center;
    margin: 0 1em;
    span {
      width: 120px;
      display: block;
      &:last-child {
        border-right: none;
      }
    }
  }
  div:last-child {
    width: 100px;
    text-align: center;
  }
`;
const ExerLogItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 2em;
  background-color: #2b2529;
  font-size: 0.9em;
  font-weight: 500;
  &:nth-child(2n) {
    background-color: #352f33;
  }
  div:first-child {
    width: 200px;
    text-align: center;
  }
  div:nth-child(2) {
    padding-left: 0.4em;
    flex-grow: 1;
  }
  div:nth-child(3) {
    display: flex;
    align-items: center;
    font-size: 0.9em;
    margin: 0 1em;
    span {
      width: 120px;
      padding-right: 0.4em;
      display: block;
      text-align: end;
    }
  }
  div:last-child {
    width: 100px;
    text-align: center;
    & > * {
      font-size: 0.9em;
      border: none;
    }
  }
`;

const IsCmp = styled.div<{ isCmp: boolean }>`
  color: ${(props) => (props.isCmp ? props.theme.green : props.theme.red)};
`;
export default function ExerLogs() {
  const records = useAppSelector((state) => state.exerLogs);
  const dispatch = useAppDispatch();
  const onClickReset = () => {
    localStorage.setItem(EXER_LOGS, JSON.stringify([]));
    dispatch(resetLog());
  };
  // 운동 시작 시간, 종료 시간
  // 세트당 걸린 시간, 휴식 시간,
  return (
    <ExerLogList>
      <button onClick={onClickReset}>초기화</button>
      <List>
        <ListHeader>
          <div>
            <span>날짜</span>
          </div>
          <div>
            <span>운동 이름</span>
          </div>
          <div>
            <span>총 걸린 시간</span>
            <span>세트당 평균 시간</span>
            <span>세트</span>
            <span>횟수</span>
            <span>달성 횟수</span>
          </div>
          <div>
            <span>완료 여부</span>
          </div>
        </ListHeader>
        {records?.map((record) => (
          <ExerLogItem key={record.recordId}>
            <div>
              <span>
                {new Date(record.date).toLocaleDateString()}{" "}
                {new Date(record.date).toLocaleTimeString()}
              </span>
            </div>
            <div>
              <span>{record.exerName}</span>
            </div>
            <div>
              <span>
                {formatTime(
                  record.recordList.reduce((a, b) => a + b, 0),
                  "str"
                )}
              </span>
              <span>
                {formatTime(
                  Math.floor(
                    record.recordList.reduce((a, b) => a + b, 0) /
                      record.exerSetCount
                  ),
                  "str"
                )}
              </span>
              <span>{record.exerSetCount}</span>
              <span>{record.exerCount}</span>
              <span>
                {record.performedSetCount}/{record.exerSetCount}
              </span>
            </div>

            <IsCmp isCmp={record.cmp}>
              <i className="fa-solid fa-circle"></i>
            </IsCmp>
          </ExerLogItem>
        ))}
      </List>
    </ExerLogList>
  );
}
