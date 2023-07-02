import React, { useState } from "react";
import styled from "styled-components";
import { resetLog } from "../redux/exercise/exerLogsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import SortIcon from "../components/common/SortIcon";

interface IRecordTg {
  [key: string]: boolean;
}

const ExerLogList = styled.section`
  width: 100%;
  height:100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > header {
    width: 100%;
    padding: 0 1em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & > button {
      border: none;
      border-radius: 7px;
      background-color: ${(props) => props.theme.mainColor};
      color: #fff;
      padding: 0.75em 1em;
      margin: 1em 0;
      cursor: pointer;
      transition: all 0.2s linear;
      &:hover {
        background-color: #000};
      }
    }
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
  & > div:first-child {
    width: 200px;
    display: flex;
    justify-content: space-evenly;
  }
  & > div:nth-child(2) {
    flex-grow: 1;
  }
  & > div:nth-child(3) {
    display: flex;
    align-items: center;
    gap: 10px;
    & > div {
      /* border: 1px solid orange; */
      width: 120px;
      display: flex;
      justify-content: space-evenly;
      & > * {
        display: block;
      }
    }
  }
  & > div:last-child {
    width: 100px;
    text-align: center;
  }
`;
const ExerLogItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 2em;
  background-color: ${(props) => props.theme.mainColor};
  font-size: 0.9em;
  font-weight: 500;
  &:nth-child(2n) {
    background-color: #352f33;
  }
  & > div:first-child {
    width: 200px;
    /* text-align: center; */
  }
  & > div:nth-child(2) {
    padding-left: 1em;
    flex-grow: 1;
  }
  & > div:nth-child(3) {
    display: flex;
    align-items: center;
    font-size: 0.9em;
    gap: 10px;
    & > div {
      width: 120px;
      padding-right: 1em;
      display: block;
      text-align: end;
    }
  }
  & > div:last-child {
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
  const dispatch = useAppDispatch();
  const storeExerLogs = useAppSelector((state) => state.exerLogs);
  const [records, setRecords] = useState(
    Array.from(storeExerLogs).sort((a, b) => b.date - a.date)
  );
  const [recordsTg, setRecordsTg] = useState<IRecordTg>({
    date: false,
    exerSetCount: false,
    exerCount: false,
  });
  const onClickReset = () => {
    if (window.confirm("정말로 운동기록을 초기화 하겠습니까?")) {
      alert("삭제되었습니다");
      dispatch(resetLog());
      setRecords([]);
    } else {
      alert("취소되었습니다");
    }
  };

  const onClickSort = (type: string) => {
    if (recordsTg[type]) {
      setRecords((prev) =>
        Array.from(prev).sort((a: any, b: any) => +b[type] - +a[type])
      );
    } else {
      setRecords((prev) =>
        Array.from(prev).sort((a: any, b: any) => +a[type] - +b[type])
      );
    }
    setRecordsTg((prev) => {
      return {
        ...prev,
        [type]: !prev[type],
      };
    });
  };

  // 운동 시작 시간, 종료 시간
  // 세트당 걸린 시간, 휴식 시간,
  return (
    <ExerLogList>
      <header>
        <button onClick={onClickReset}>
          <i className="fa-solid fa-arrow-rotate-right" />
        </button>
      </header>
      <List>
        <ListHeader>
          <div
            onClick={() => {
              onClickSort("date");
            }}
          >
            <span>날짜</span>
            <SortIcon sort={recordsTg.date} />
          </div>
          <div>
            <span>운동 이름</span>
          </div>
          <div>
            <div
              onClick={() => {
                onClickSort("exerSetCount");
              }}
            >
              <span>세트</span>
              <SortIcon sort={recordsTg.exerSetCount} />
            </div>
            <div
              onClick={() => {
                onClickSort("exerCount");
              }}
            >
              <span>횟수</span>
              <SortIcon sort={recordsTg.exerCount} />
            </div>
            <div>
              <span>달성 횟수</span>
            </div>
          </div>
          <div>
            <span>완료 여부</span>
          </div>
        </ListHeader>
        {records ? (
          records.map((record) => (
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
                <div>{record.exerSetCount}</div>
                <div>{record.exerCount}</div>
                <div>
                  {record.performedSetCount}/{record.exerSetCount}
                </div>
              </div>
              <IsCmp isCmp={record.cmp}>
                <i className="fa-solid fa-circle"></i>
              </IsCmp>
            </ExerLogItem>
          ))
        ) : (
          <h1>운동 기록이 없습니다</h1>
        )}
      </List>
    </ExerLogList>
  );
}
