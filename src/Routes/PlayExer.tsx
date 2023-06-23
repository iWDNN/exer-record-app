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
const TitleCt = styled.div`
  background: #262626;
  & > h1 {
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
      <TitleCt>
        <h1>{exerInfo.exerName}</h1>
      </TitleCt>
      <TimerCt>
        <span>{formattedTime[0]}</span>:<span>{formattedTime[1]}</span>.
        <span>{formattedTime[2]}</span>
      </TimerCt>
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
                {!initRun && <button onClick={onClickSetCmp}>세트완료</button>}
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
    </Ct>
  );
}
