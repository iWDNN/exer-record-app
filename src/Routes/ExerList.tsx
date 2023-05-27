import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ExerItem from "../components/ExerItem";
import {
  exerDel,
  IExerciseState,
  setExer,
} from "../features/exercise/exerciseSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { EXERCISES } from "../ls-type";

interface IForm {
  exerSetCount: number;
  exerCount: number;
  exerSetRestTerm: number;
}

const Ct = styled.section`
  width: 100%;
  padding: 0 1em;
`;
const List = styled.ul`
  width: 100%;
  display: flex;
  /* justify-content: space-evenly; */
  flex-wrap: wrap;
  gap: 10px;
`;

export default function ExerList() {
  const exercise = useAppSelector((state) => state.exercise);
  const dispatch = useAppDispatch();

  const [popUp, setPopUp] = useState(false);
  const [popUpData, setPopUpData] = useState<IExerciseState>();

  const { register, handleSubmit } = useForm<IExerciseState>();

  const onSubmit = (data: IForm) => {
    const result: IExerciseState = {
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
    const exercisesLS: IExerciseState[] = JSON.parse(
      localStorage.getItem("exercises") as any
    );
    const result = exercisesLS.filter((exercise) => exercise.id !== id);
    localStorage.setItem(EXERCISES, JSON.stringify(result));
    dispatch(exerDel(id));
  };
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
