import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { addLog, IRecord } from "../redux/exercise/exerLogsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { EXERCISE_STATE } from "../type";
import { formatTime, useInterval } from "../utils";

const Ct = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 65% 35%;
  align-items: center;
  padding: 1em;
  border: 1px solid gray;
  background-color: #121212;
  * {
    border: 1px solid gray;
  }
  & > section {
    display: flex;
    flex-direction: column;
  }
  & > section:nth-child(1) {
    width: 100%;
    height: 100%;
  }
  & > section:nth-child(2) {
    width: 100%;
    height: 100%;
  }
`;
const TitleCt = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 70%;
  align-items: center;
  & > * {
    padding: 1em;
  }
  h1 {
    font-size: 1.5em;
    font-weight: 700;
  }
  h2 {
    font-weight: 600;
  }
  & > div:nth-child(2) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    span {
      margin: 0 1em;
    }
  }
`;
const TimerCt = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5.5em;
`;
const StateCt = styled.div``;
const ControlCt = styled.div``;

const RecordCt = styled.div``;

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
    if (initRun && !isRunning && !isRest) return EXERCISE_STATE.init;
    else if (!initRun && isRunning && !isRest) return EXERCISE_STATE.play;
    else if (!initRun && !isRunning && isRest) return EXERCISE_STATE.rest;
    else if (!initRun && records.length === 0 && !isRunning && !isRest)
      return EXERCISE_STATE.pause;
    else if (!initRun && records.length > 0 && !isRunning && !isRest)
      return EXERCISE_STATE.readyNextSet;
    else if (records.length === +exerInfo.exerSetCount)
      return EXERCISE_STATE.cmp;
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
      <section>
        <TitleCt>
          <div>
            <h1>{exerInfo.exerName}</h1>
            {exerInfo.exerWeight && <h2>{exerInfo.exerWeight}kg</h2>}
          </div>
          <div>
            <span>세트 {exerInfo.exerSetCount} 세트</span>
            <span>횟수 {exerInfo.exerCount} 회</span>
            <span>휴식 시간 {exerInfo.exerSetRestTerm} 초</span>
          </div>
        </TitleCt>
        <TimerCt>
          <span>{formattedTime[0]}</span>:<span>{formattedTime[1]}</span>.
          <span>{formattedTime[2]}</span>
        </TimerCt>
      </section>
      <section>
        <StateCt>
          <span>세트당 {exerInfo.exerCount}회</span>
          <span>
            {records.filter((record) => record !== 0).length}/
            {exerInfo.exerSetCount}
          </span>
          <span>{watchState()}</span>
        </StateCt>
        <ControlCt>
          {watchState() === EXERCISE_STATE.cmp ? (
            <Link to={"/"}>돌아가기</Link>
          ) : (
            <>
              {!(watchState() === EXERCISE_STATE.rest) ? (
                <>
                  <button onClick={onClickPlay}>
                    {watchState() === EXERCISE_STATE.play ? (
                      <i className="fa-solid fa-pause" />
                    ) : watchState() === EXERCISE_STATE.pause ? (
                      <i className="fa-solid fa-play" />
                    ) : (
                      <i className="fa-solid fa-play" />
                    )}
                  </button>
                  {!initRun && time !== 0 && (
                    <button onClick={onClickSetCmp}>세트완료</button>
                  )}
                </>
              ) : null}

              <button onClick={onClickReset}>
                <i className="fa-solid fa-arrow-rotate-right" />
              </button>
              <button onClick={onClickSubmit}>제출</button>
            </>
          )}
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
      </section>
    </Ct>
  );
}
