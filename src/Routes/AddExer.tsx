import React from "react";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";
import styled from "styled-components";
import { add, ExerciseState } from "../features/exercise/exerciseSlice";
import { addToggle } from "../features/toggle/toggleSlice";
import { useAppDispatch } from "../hooks";
interface IFormData {
  exerName: string;
  maxCount: string;
  setCount: string;
}

const AddSection = styled.section`
  padding: 1em;
  form {
    width: 270px;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: 100%;
      padding: 1em;
      margin: 1px 0;
      background-color: rgba(0, 0, 0, 0.02);
      border: none;
    }
    button {
      width: 100%;
      padding: 1em;
      margin-top: 10px;
      border: none;
      cursor: pointer;
      transition: 0.2s all ease-in-out;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;
export default function AddExer() {
  const { register, handleSubmit, setValue } = useForm<IFormData>();
  const dispatch = useAppDispatch();
  const onSubmit = (data: IFormData) => {
    const result: ExerciseState = {
      id: uuid(),
      exerName: data.exerName,
      exerCount: String(Math.floor(+data.maxCount / 2 + +data.maxCount / 4)),
      exerSetCount: data.setCount,
    };
    dispatch(add(result));
    dispatch(addToggle(false));
    setValue("exerName", "");
    setValue("maxCount", "");
    setValue("setCount", "");
  };
  return (
    <AddSection>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("exerName")}
          placeholder="운동 이름을 입력해주세요"
        />
        <input
          {...register("maxCount")}
          placeholder="운동 가능 최대 횟수를 입력해주세요"
        />
        <input
          {...register("setCount")}
          placeholder="세트 횟수를 입력해주세요"
        />
        <button>추가</button>
      </form>
    </AddSection>
  );
}
