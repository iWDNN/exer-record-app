import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import { addLog } from "../features/exercise/exerLogsSlice";
import {
  complete,
  decrease,
  increase,
  reset,
  setClear,
} from "../features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { countdown, formatTime } from "../utils";

interface IRestTime {
  time: number;
}

const Container = styled.div`
  width: 235px;
  margin: 1em 0;
  section {
    margin: 1em 0;
  }
  button {
    width: 100%;
    padding: 0.5em 1em;
    border: 1px solid #181818;
    background-color: transparent;
    cursor: pointer;
  }
`;
const TimerDisplay = styled.section`
  h2 {
    text-align: center;
    font-size: 1.2em;
  }
  p {
    display: block;
    margin: 10px 0;
    text-align: center;
    span {
      font-size: 84px;
      font-weight: 300;
    }
  }
  ul {
    li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
    }
  }
`;

const TimerControl = styled.section`
  & > div:first-child {
    display: flex;
    justify-content: space-evenly;
    button {
      width: 50%;
    }
  }
`;

const TimerRecord = styled.section`
  h3 {
    font-weight: 600;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    border-bottom: 1px solid #eee;
  }
`;

function PlayTime() {
  const time = useAppSelector((state) => state.timer.time);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("(Mounted)PlayTime interval ing...");
      dispatch(increase());
    }, 1000);
    return () => {
      // console.log("(unMounted)PlayTime intervel end");
      clearInterval(interval);
    };
  }, []);

  return <span>{formatTime(time)}</span>;
}

function RestTime() {
  const restTime = useAppSelector((state) => state.timer.record.setRestTerm);
  const [count, setCounter] = useState(restTime);
  const asyncAwait = async () => {
    await countdown(restTime, setCounter);
  };
  useEffect(() => {
    asyncAwait();
  }, []);

  return <span>{formatTime(count)}</span>;
}

export default function PlayExer() {
  const curExer = useAppSelector((state) => state.timer.record);
  const time = useAppSelector((state) => state.timer.time);
  const dispatch = useAppDispatch();

  const [playTg, setPlayTg] = useState(false);
  const [restTg, setRestTg] = useState(false);

  const onClickStart = () => {
    setPlayTg((prev) => !prev);
    setRestTg(false);
  };
  const onClickSetClear = () => {
    setPlayTg(false);
    setRestTg(true);
    dispatch(setClear());
  };
  const onClickComplete = () => {
    if (curExer.playSetCount >= curExer.setCount) {
      dispatch(complete());
    }
    console.log(curExer);
    dispatch(addLog(curExer));
    dispatch(reset());
  };
  return (
    <Container>
      <TimerDisplay>
        <h2>{curExer.name}</h2>
        <p>
          {playTg || restTg ? (
            <>
              {playTg && <PlayTime />}
              {restTg && <RestTime />}
            </>
          ) : (
            <span>{formatTime(time)}</span>
          )}
        </p>
        <ul>
          <li>
            <span>횟수</span>
            <span>{curExer.exerCount}</span>
          </li>
          <li>
            <span>세트</span>
            <span>
              {curExer.playSetCount} / {curExer.setCount}
            </span>
          </li>
        </ul>
      </TimerDisplay>
      <TimerControl>
        <div>
          <button onClick={onClickStart}>{playTg ? "일시정지" : "시작"}</button>
          <button onClick={onClickSetClear}>세트 완료</button>
        </div>
      </TimerControl>
      <TimerRecord>
        <h3>세트 당 걸린 시간</h3>
        <ul>
          {curExer.detailTimes.map((setTime, i) => (
            <li key={uuid()}>
              <span>{i + 1} set</span>
              <span>{setTime}s</span>
            </li>
          ))}
        </ul>
      </TimerRecord>
      <button onClick={onClickComplete}>
        {curExer.playSetCount >= curExer.setCount ? "완료" : "포기"}
      </button>
    </Container>
  );
}
