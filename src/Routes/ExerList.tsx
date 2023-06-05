import React from "react";
import styled from "styled-components";
import ExerItem from "../components/ExerItem";
import { IExerciseState } from "../redux/exercise/exerciseSlice";
import { useAppSelector } from "../redux/hooks";

const Ct = styled.section`
  width: 100%;
  padding: 0 1em;
`;
const List = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media screen and (max-width: 1439px) {
    display: flex;
    flex-direction: column;
  }
  gap: 10px;
`;

export default function ExerList() {
  const exercise = useAppSelector((state) => state.exercise);

  return (
    <>
      <Ct>
        <List>
          {exercise.map((exer: IExerciseState) => (
            <ExerItem exerData={exer} key={exer.id} />
          ))}
        </List>
      </Ct>
    </>
  );
}
