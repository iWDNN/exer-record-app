import React from "react";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";
import styled from "styled-components";
import { add, ExerciseState } from "../features/exercise/exerciseSlice";
import { addToggle } from "../features/toggle/toggleSlice";
import { useAppDispatch } from "../hooks";
import { EXERCISES } from "../ls-type";
interface IFormData {
  exerName: string;
  maxCount: number;
  setCount: number;
  setRestTerm: number;
}

const AddSection = styled.section`
  padding: 1em;
  form {
    width: 270px;
    display: flex;
    flex-direction: column;
    align-items: center;

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
const InputEl = styled.div`
  width: 100%;
  span {
    text-align: start;
    color: ${(props) => props.theme.red};
    font-size: 0.8em;
    font-weight: 700;
  }
`;
const Input = styled.input<{ isError?: boolean }>`
  width: 100%;
  padding: 1em;
  margin: 1px 0;
  background-color: rgba(0, 0, 0, 0.02);
  border: none;
`;

export default function AddExer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const dispatch = useAppDispatch();
  const onSubmit = (data: IFormData) => {
    const result: ExerciseState = {
      id: uuid(),
      exerName: data.exerName,
      exerCount: Math.floor(+data.maxCount / 2 + +data.maxCount / 4),
      exerSetCount: data.setCount,
      exerSetRestTerm: data.setRestTerm,
    };
    const exercisesLS: ExerciseState[] = JSON.parse(
      localStorage.getItem(EXERCISES) as any
    );
    localStorage.setItem(EXERCISES, JSON.stringify([...exercisesLS, result]));
    dispatch(add(result));
    dispatch(addToggle(false));
  };
  return (
    <AddSection>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputEl>
          <Input
            {...register("exerName", { required: "운동 이름을 입력해주세요" })}
            placeholder="운동 이름"
          />
          <span>{errors.exerName?.message}</span>
        </InputEl>
        <InputEl>
          <Input
            {...register("maxCount", {
              required: "가능한 최대 횟수를 입력해주세요",
              pattern: {
                value: /[0-9]/g,
                message: "숫자만 입력해주세요",
              },
            })}
            placeholder="가능한 최대 횟수"
          />
          <span>{errors.maxCount?.message}</span>
        </InputEl>
        <InputEl>
          <Input
            {...register("setCount", {
              required: "세트 횟수를 입력해주세요",
              pattern: {
                value: /[0-9]/g,
                message: "숫자만 입력해주세요",
              },
            })}
            placeholder="세트 횟수"
          />
          <span>{errors.setCount?.message}</span>
        </InputEl>
        <InputEl>
          <Input
            {...register("setRestTerm", {
              required: "세트 당 휴식시간을 입력해주세요 (초)",
              pattern: {
                value: /[0-9]/g,
                message: "숫자만 입력해주세요",
              },
            })}
            placeholder="세트 당 휴식시간(초)"
          />
          <span>{errors.setRestTerm?.message}</span>
        </InputEl>
        <button>추가</button>
      </form>
    </AddSection>
  );
}
