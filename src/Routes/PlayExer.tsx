import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { ExerciseState } from "../features/exercise/exerciseSlice";
import { setTime, timeIncrease } from "../features/time/timeSlice";
import { startToggleSwitch } from "../features/toggle/toggleSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { formatTime } from "../utils";

interface IPlayExerInfo extends ExerciseState {
  // id: string;
  // exerName: string;
  // exerCount: number;
  // exerSetCount: number;
  // exerSetRestTerm: number;
  cmp: boolean;
  records: number[];
}

const Container = styled.div`
  width: 100%;
  margin-top: 50px;
  * {
    /* border: 1px solid black; */
    padding: 5px;
  }
`;
const Title = styled.h1`
  font-size: 1.3em;
  font-weight: 500;
  text-align: center;
`;
const Time = styled.div`
  font-size: 5em;
  font-weight: 600;
  padding: 10px 0;
  text-align: center;
`;
const BtnCt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    padding: 0.5em 1em;
    background-color: transparent;
    border: 1px solid #121212;
    cursor: pointer;
  }
`;
const Records = styled.ul`
  /* padding: 1em; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  h2 {
    font-size: 1.1em;
    font-weight: 600;
  }
`;
const Record = styled.li`
  border-bottom: 1.5px solid #eee;
  border-radius: 2px;
`;

function PlayTime() {
  const dispatch = useAppDispatch();
  const { time } = useAppSelector((state) => state.time);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(timeIncrease());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <>{formatTime(time)}</>;
}

export default function PlayExer() {
  const { exerId } = useParams();

  //store
  const dispatch = useAppDispatch();
  const [exercise] = useAppSelector((state) => state.exercise).filter(
    (exer) => exer.id === exerId
  );
  const { time } = useAppSelector((state) => state.time);

  const startToggle = useAppSelector((state) => state.toggle.startToggle);
  // component
  const [initStart, setInitStart] = useState(false);
  const [records, setRecords] = useState<number[]>([]);

  const onClickStart = () => {
    dispatch(startToggleSwitch("toggle"));
    setInitStart(true);
  };
  const onClickSetCmp = () => {
    dispatch(startToggleSwitch(false));
    setInitStart(false);
    setRecords((prev) => [...prev, time]); // records useState훅 변수에 기록
    dispatch(setTime(0)); // 리덕스 현재 시간 초기화
  };

  return (
    <Container>
      <Title>{exercise.exerName}</Title>
      <Time>{startToggle ? <PlayTime /> : formatTime(time)}</Time>
      <BtnCt>
        <button onClick={onClickStart}>
          {!initStart ? "시작" : startToggle ? "일시정지" : "재시작"}
        </button>
        <button onClick={onClickSetCmp}>세트완료</button>
      </BtnCt>
      <Records>
        <h2>기록</h2>
        {records.map((record, i) => (
          <Record key={uuid()}>
            <span>{i + 1} set</span>
            <span>{formatTime(record)}</span>
          </Record>
        ))}
      </Records>
    </Container>
  );
}
