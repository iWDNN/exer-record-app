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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 1em;

  button:first-child {
    border: none;
    border-radius: 7px;
    padding: 0.75em 1em;
    margin: 1em 0;
    cursor: pointer;
  }
`;
const List = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media screen and (max-width: 1439px) {
    display: flex;
    flex-direction: column;
  }
`;

export default function ExerList() {
  const dispatch = useAppDispatch();
  const exercise = useAppSelector((state) => state.exercise);
  const addTg = useAppSelector((state) => state.toggle.addToggle);

  return (
    <>
      <Ct>
        <button
          onClick={() => {
            dispatch(addToggleSwitch("toggle"));
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
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
