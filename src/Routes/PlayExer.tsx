import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import { useInterval } from "../utils";
const Ct = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 20% 20% 30%;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const TimerCt = styled.div`
  background-color: #000;
`;
const StateCt = styled.div`
  background-color: #171717;
`;
const ControlCt = styled.div`
  background-color: #282828;
`;
const RecordCt = styled.div`
  background-color: #565656;
`;
export default function PlayExer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useInterval(
    () => {
      setTime(time + 1);
    },
    isRunning ? 10 : null
  );
  console.log("imalive2");
  return (
    <Ct>
      <TimerCt>{time}</TimerCt>
      <StateCt>운동시작 | 운동중 | 운동끝 | 일시정지</StateCt>
      <ControlCt>
        <button
          onClick={() => {
            setIsRunning(true);
          }}
        >
          시작
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
          }}
        >
          일시정지
        </button>
        <button
          onClick={() => {
            setTime(0);
          }}
        >
          리셋
        </button>
      </ControlCt>
      <RecordCt>
        <ul>
          <li>00:42.12</li>
          <li>00:40.12</li>
          <li>00:28.12</li>
          <li>00:10.12</li>
        </ul>
      </RecordCt>
    </Ct>
  );
}
