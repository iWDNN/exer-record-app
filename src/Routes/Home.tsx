import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { del, ExerciseState } from "../features/exercise/exerciseSlice";
import { reset, startSet } from "../features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { EXERCISES } from "../ls-type";

const ListSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > ul {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Exercise = styled.li<{ isActive?: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cdcdcd;
  border-radius: 7px;
  margin-bottom: 1em;
  padding: 1em;
  margin: 0.5em 1em;
  div:first-child {
    h2 {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 2px;
    }
    ul {
      margin-top: 15px;
      display: flex;
      opacity: 0.8;
      li {
        font-size: 0.8em;
        margin-right: 10px;
        span {
          font-size: 1.3em;
          font-weight: 600;
        }
      }
    }
  }

  div:last-child {
    display: flex;
    flex-direction: column;
    a:first-child {
      padding: 1em;
      border: 1px solid #eee;
      border-radius: 7px;
      transition: 0.2s all ease-in-out;
      &:hover {
        background-color: #eee;
      }
    }
    button {
      margin-top: 5px;
      border: none;
      cursor: pointer;
    }
  }
`;
export default function Home() {
  const exercise = useAppSelector((state) => state.exercise);
  const dispatch = useAppDispatch();
  const onClickSubmit = (exer: ExerciseState) => {
    const result = {
      id: exer.id,
      name: exer.exerName,
      exerCount: exer.exerCount,
      setCount: +exer.exerSetCount,
      setRestTerm: exer.exerSetRestTerm,
      date: String(new Date().toLocaleString()),
    };
    dispatch(reset());
    dispatch(startSet(result));
  };
  const onClickDelete = (id: string) => {
    const exercisesLS: ExerciseState[] = JSON.parse(
      localStorage.getItem("exercises") as any
    );
    const result = exercisesLS.filter((exercise) => exercise.id !== id);
    localStorage.setItem(EXERCISES, JSON.stringify(result));
    dispatch(del(id));
  };
  return (
    <ListSection>
      <ul>
        {exercise.map((exer: ExerciseState) => (
          <Exercise key={exer.id}>
            <div>
              <h2>{exer.exerName}</h2>
              <ul>
                <li>
                  <span>{exer.exerSetCount}</span> 세트
                </li>
                <li>
                  <span>{exer.exerCount}</span> 횟수
                </li>
                <li>
                  <span>{exer.exerSetRestTerm}</span>초씩 휴식
                </li>
              </ul>
            </div>
            <div>
              <Link to={`/play`} onClick={() => onClickSubmit(exer)}>
                시작
              </Link>
              <button
                onClick={() => {
                  onClickDelete(exer.id);
                }}
              >
                삭제
              </button>
            </div>
          </Exercise>
        ))}
      </ul>
    </ListSection>
  );
}
