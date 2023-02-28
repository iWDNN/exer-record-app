import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { addLog } from "../features/exercise/exerLogsSlice";
import {
  increase,
  IRecord,
  setClear,
  setIsRest,
} from "../features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { EXER_LOGS } from "../ls-type";
import { countdown, formatTime } from "../utils";

const Container = styled.div`
  width: 340px;
  display: flex;
  justify-content: center;
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
const TimerCt = styled.div<{ isComplete?: boolean }>`
  width: 100%;
  padding: 20px;
  border-radius: 7px;
  border: ${(props) =>
    props.isComplete ? "4px solid" + props.theme.green : "none"};
  transition: 0.2s all ease-in-out;
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
const Time = styled.p<{ isRest: boolean }>``;

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
  const dispatch = useAppDispatch();

  const [count, setCounter] = useState(restTime);
  const asyncAwait = async () => {
    await countdown(restTime, setCounter).then(() => {
      dispatch(setIsRest(false));
    });
  };
  useEffect(() => {
    asyncAwait();
  }, []);

  return <span>{formatTime(count)}</span>;
}

export default function PlayExer() {
  const curExer = useAppSelector((state) => state.timer.record);
  const { time, isRest } = useAppSelector((state) => state.timer);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [playTg, setPlayTg] = useState(false);
  const [restTg, setRestTg] = useState(false);

  const onClickStart = () => {
    setPlayTg((prev) => !prev);
    setRestTg(false);
    dispatch(setIsRest(false));
  };
  const onClickSetClear = () => {
    setPlayTg(false);
    setRestTg(true);
    dispatch(setIsRest(true));
    dispatch(setClear());
  };
  const onClickComplete = () => {
    const exercisesLS: IRecord[] = JSON.parse(
      localStorage.getItem(EXER_LOGS) as any
    );
    localStorage.setItem(EXER_LOGS, JSON.stringify([...exercisesLS, curExer]));
    dispatch(addLog(curExer));
    setPlayTg(false);
    setRestTg(false);
    navigate("/");
  };
  return (
    <Container>
      <TimerCt isComplete={curExer.playSetCount >= curExer.setCount}>
        <TimerDisplay>
          <h2>{isRest ? "휴식 중..." : curExer.name}</h2>
          <Time isRest={isRest}>
            {playTg || restTg ? (
              <>
                {playTg && <PlayTime />}
                {restTg && <RestTime />}
              </>
            ) : (
              <span>{formatTime(time)}</span>
            )}
          </Time>
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
            <button onClick={onClickStart}>
              {playTg ? "일시정지" : "시작"}
            </button>
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
        {curExer.playSetCount > 0 && (
          <button onClick={onClickComplete}>
            {curExer.playSetCount >= curExer.setCount ? "완료" : "포기"}
          </button>
        )}
      </TimerCt>
    </Container>
  );
}
