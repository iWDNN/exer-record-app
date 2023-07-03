import React, { useEffect, useMemo, useState } from "react";
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
  background-color: #121212;
  /* border: 1px solid gray; */
  * {
    /* border: 1px solid gray; */
  }
  & > section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  & > section:nth-child(1) {
    justify-content: center;
    align-items: center;
  }
  & > section:nth-child(2) {
  }
`;
const TitleCt = styled.div`
  width: 100%;
  text-align: center;
  & > * {
    padding: 1em;
  }
  h1 {
    font-size: 3em;
    font-weight: 700;
  }
  h2 {
    font-size: 1.5em;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5.5em;
  span {
    width: 110px;
    text-align: center;
  }
`;
const ControlCt = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    & > button {
      width: 70px;
      height: 70px;
      font-size: 1.5em;
      color: #fff;
      border: none;
      margin: 10px;
      border-radius: 20px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
      background-color: ${(props) => props.theme.subColor};
      cursor: pointer;
    }
  }
`;

const StateCt = styled.div`
  span {
    display: block;
    text-align: center;
    font-size: 1.5em;
    font-weight: 500;
    padding: 0.5em;
  }
`;

const RecordCt = styled.div`
  width: 100%;
  ul {
    width: 100%;
    li {
      display: flex;
      width: 100%;
      font-size: 1.4em;
      font-weight: 500;
      padding: 1em;
      & > div:nth-child(1) {
      }
      & > div:nth-child(2) {
        margin-left: 10px;
      }
    }
  }
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
    else if (
      !initRun &&
      records.length > 0 &&
      !isRunning &&
      !isRest &&
      !(records.length === +exerInfo.exerSetCount)
    )
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
      if (isRest && time === 1 && records.length !== +exerInfo.exerSetCount) {
        setIsRest(false);
        setIsRunning(true);
      }
      if (isRunning) setTime(time + 1);
      if (isRest) setTime(time - 1);
    },
    isRunning || isRest ? 10 : null
  );
  useEffect(() => {
    if (records.length === +exerInfo.exerSetCount) {
      setIsRest(false);
      setIsRunning(false);
      onClickSubmit();
      console.log("submit");
    }
  }, [records]);
  return (
    <Ct>
      <section>
        <TitleCt>
          <div>
            <h1>{exerInfo.exerName}</h1>
            {exerInfo.exerWeight !== 0 && <h2>{exerInfo.exerWeight}kg</h2>}
          </div>
        </TitleCt>
        <TimerCt>
          <span>{formattedTime[0]}</span>:<span>{formattedTime[1]}</span>.
          <span>{formattedTime[2]}</span>
        </TimerCt>
        <StateCt>
          <span>{watchState()}</span>
          <span>
            {records.filter((record) => record !== 0).length}/
            {exerInfo.exerSetCount}
          </span>
        </StateCt>
        <ControlCt>
          <div>
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
              </>
            )}
          </div>
          <div>
            <button onClick={onClickReset}>
              <i className="fa-solid fa-arrow-rotate-right" />
            </button>
            {watchState() !== EXERCISE_STATE.cmp && (
              <button onClick={onClickSubmit}>제출</button>
            )}
          </div>
        </ControlCt>
      </section>
      <section>
        <RecordCt>
          <ul>
            {records.map((record, i) => (
              <li key={uuid()}>
                <div>{i + 1}번째</div> <div>{formatTime(record, "str")}</div>
              </li>
            ))}
          </ul>
        </RecordCt>
      </section>
    </Ct>
  );
}
