import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { addLog, IRecord } from "../redux/exercise/exerLogsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { formatTime, useInterval } from "../utils";
const Ct = styled.div`
  width: 100%;
  /* display: grid;
  grid-template-columns: 30% 20% 20% 30%; */
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const TimerCt = styled.div`
  width: 120px;
  font-size: 4em;
  font-family: "Exo", sans-serif;
  background: #000;
  span {
    display: block;
    width: 85px;
    &:nth-child(2) {
      text-align: center;
    }
  }
`;
const StateCt = styled.div`
  background-color: #171717;
  display: flex;
  flex-direction: column;
  span {
    display: block;
  }
  & > span:first-child {
  }
  & > span:last-child {
  }
`;
const ControlCt = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #282828;
  button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    background-color: #171717;
    color: #fff;
    i {
      /* color: #fff; */
      /* text-shadow: 0 0 5px #219cf3; */
    }
  }
`;
const RecordCt = styled.div`
  background-color: #565656;
`;
export default function PlayExer() {
  const dispatch = useAppDispatch();

  const { exerId } = useParams();
  const [exerInfo] = useAppSelector((state) => state.exercise).filter(
    (exer) => exer.exerId === exerId && exer
  );

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [initRun, setInitRun] = useState(true);
  const [records, setRecords] = useState<number[]>([]);

  const formattedTime = useMemo(() => formatTime(time, "arr"), [time]);

  const watchState = () => {
    if (!isRest && !isRunning && initRun) return "운동시작전";
    else if (isRunning && !initRun) return "운동중";
    else if (!isRunning && !initRun) return "일시정지";
    else if (isRest && !isRunning && initRun) return "휴식중";
    else if (
      records.filter((record) => record !== 0).length === +exerInfo.exerSetCount
    )
      return "운동완료";
  };
  const onClickPlay = () => {
    setIsRunning((prev) => !prev);
    setInitRun(false);
  };
  const onClickReset = () => {
    setIsRunning(false);
    setIsRest(false);
    setInitRun(true);
    setTime(0);
    setRecords([]);
  };
  const onClickSetCmp = () => {
    setIsRunning(false);
    setRecords((prev) => [...prev, time]);
    setTime(exerInfo.exerSetRestTerm * 100);
    setIsRest(true);
    setInitRun(true);
  };

  const onClickSubmit = () => {
    const performedSet = records.filter((record) => record !== 0).length;
    const result: IRecord = {
      recordId: uuid(),
      date: new Date().getTime(),
      recordList: records,
      performedSetCount: performedSet,
      cmp: performedSet >= +exerInfo.exerSetCount,
      ...exerInfo,
    };
    dispatch(addLog(result));
  };
  useInterval(
    () => {
      if (isRest && time === 1) {
        setIsRest(false);
      }
      if (isRunning) setTime(time + 1);
      if (isRest) setTime(time - 1);
    },
    isRunning || isRest ? 10 : null
  );
  return (
    <Ct>
      <TimerCt>
        <span>{formattedTime[0]}</span>:<span>{formattedTime[1]}</span>.
        <span>{formattedTime[2]}</span>
      </TimerCt>
      <StateCt>
        <span>
          {records.filter((record) => record !== 0).length}/
          {exerInfo.exerSetCount}
        </span>
        <span>{watchState()}</span>
      </StateCt>
      <ControlCt>
        <button onClick={onClickPlay}>
          {watchState() === "운동중" ? (
            <i className="fa-solid fa-pause" />
          ) : watchState() === "일시정지" ? (
            <i className="fa-solid fa-play" />
          ) : (
            <i className="fa-solid fa-play" />
          )}
        </button>
        <button onClick={onClickReset}>
          <i className="fa-solid fa-arrow-rotate-right" />
        </button>
        <button onClick={onClickSetCmp}>세트완료</button>
        <button onClick={onClickSubmit}>제출</button>
      </ControlCt>
      <RecordCt>
        <ul>
          {records.map((record, i) => (
            <li key={uuid()}>
              {i + 1}번째 {formatTime(record, "str")}
            </li>
          ))}
        </ul>
      </RecordCt>
    </Ct>
  );
}
