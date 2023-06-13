import React, { useState } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import AddTap from "../components/AddTap";
import ExerItem from "../components/ExerItem";
import { IExerciseState } from "../redux/exercise/exerciseSlice";
import { useAppSelector } from "../redux/hooks";

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
  const exercise = useAppSelector((state) => state.exercise);
  const [addTg, setAddTg] = useState(false);

  return (
    <>
      <Ct>
        <button
          onClick={() => {
            setAddTg((prev) => !prev);
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
