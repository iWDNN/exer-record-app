import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  exerDel,
  ExerciseState,
  setExer,
} from "../features/exercise/exerciseSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { EXERCISES } from "../ls-type";

interface IForm {
  exerSetCount: number;
  exerCount: number;
  exerSetRestTerm: number;
}

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
      display: flex;
      align-items: center;
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
const BtnGrp = styled.div``;
const PopUpCt = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  div {
    padding: 10px;
    background-color: #eee;
    border-radius: 5px;
  }
`;
export default function ExerList() {
  const exercise = useAppSelector((state) => state.exercise);
  const dispatch = useAppDispatch();

  const [popUp, setPopUp] = useState(false);
  const [popUpData, setPopUpData] = useState<ExerciseState>();

  const { register, handleSubmit } = useForm<ExerciseState>();

  const onSubmit = (data: IForm) => {
    const result: ExerciseState = {
      id: popUpData!.id,
      exerName: popUpData!.exerName,
      exerCount: data.exerCount,
      exerSetCount: data.exerSetCount,
      exerSetRestTerm: data.exerSetRestTerm,
    };
    const targetIndex = exercise.findIndex((exer) => exer.id === popUpData!.id);
    const prev = exercise.slice(0, targetIndex);
    const others = exercise.slice(targetIndex + 1);
    const changeExer = [...prev, result, ...others];
    localStorage.setItem(EXERCISES, JSON.stringify(changeExer));
    dispatch(setExer(changeExer));
    setPopUp(false);
  };

  const onClickDelete = (id: string) => {
    const exercisesLS: ExerciseState[] = JSON.parse(
      localStorage.getItem("exercises") as any
    );
    const result = exercisesLS.filter((exercise) => exercise.id !== id);
    localStorage.setItem(EXERCISES, JSON.stringify(result));
    dispatch(exerDel(id));
  };
  return (
    <>
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
              <BtnGrp>
                <Link to={`/play/${exer.id}`}>시작</Link>
                <button
                  onClick={() => {
                    onClickDelete(exer.id);
                  }}
                >
                  삭제
                </button>
                <button
                  onClick={() => {
                    setPopUp((prev) => !prev);
                    setPopUpData(exer);
                  }}
                >
                  수정
                </button>
              </BtnGrp>
            </Exercise>
          ))}
        </ul>
      </ListSection>
      {popUp && (
        <PopUpCt>
          <div
          // onBlur={() => {
          //   setPopUp((prev) => !prev);
          // }}
          >
            <h1>{popUpData?.exerName}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="number"
                {...register("exerSetCount", {
                  valueAsNumber: true,
                  value: popUpData?.exerSetCount,
                })}
                placeholder="set"
              />
              <input
                type="number"
                {...register("exerCount", {
                  valueAsNumber: true,
                  value: popUpData?.exerCount,
                })}
                placeholder="count"
              />
              <input
                type="number"
                {...register("exerSetRestTerm", {
                  valueAsNumber: true,
                  value: popUpData?.exerSetRestTerm,
                })}
                placeholder="rest"
              />
              <ul>
                <button>수정</button>
                <button
                  onClick={() => {
                    setPopUp(false);
                  }}
                >
                  취소
                </button>
              </ul>
            </form>
          </div>
        </PopUpCt>
      )}
    </>
  );
}
