import React, { useState } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import AddTap from "../components/AddTap";
import ExerItem from "../components/ExerItem";
import { IExerciseState } from "../redux/exercise/exerciseSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToggleSwitch } from "../redux/toggle/toggleSlice";

const Ct = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 1100px) {
  }
  & > header {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
    h1 {
      font-weight: 700;
      font-size: 1.5em;
      letter-spacing: 1px;
    }
    button {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 7px;
      background-color: ${(props) => props.theme.mainColor};
      color: #fff;
      font-size: 1.1em;
      outline: none;
      cursor: pointer;
      &:hover {
        color: #d4d4d4;
      }
    }
  }
`;
const List = styled.ul`
  padding: 0 1em;
  width: 100%;
  display: flex;
  flex-direction: column;

  /* @media screen and (max-width: 1439px) {
  } */
`;
const ListHeader = styled.div``;

export default function ExerList() {
  const dispatch = useAppDispatch();
  const exercise = useAppSelector((state) => state.exercise);
  const addTg = useAppSelector((state) => state.toggle.addToggle);

  return (
    <>
      <Ct>
        <header>
          <h1>운동 리스트</h1>
          <button
            onClick={() => {
              dispatch(addToggleSwitch("toggle"));
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </header>
        {addTg && <AddTap />}

        <List>
          {exercise.map((exer: IExerciseState) => (
            <ExerItem exerData={exer} key={uuid()} />
          ))}
        </List>
      </Ct>
    </>
  );
}
