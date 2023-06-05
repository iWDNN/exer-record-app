import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { motion } from "framer-motion";
import { addExer } from "../redux/exercise/exerciseSlice";
import uuid from "react-uuid";
import { addToggleSwitch } from "../redux/toggle/toggleSlice";

interface IFormData {
  exerName: string;
  maxCount: number;
  setCount: number;
  setRestTerm: number;
}

const AddSection = styled(motion.section)`
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
  display: flex;
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
  color: #fff;
`;

export default function AddTap() {
  const exercises = useAppSelector((state) => state.exercise);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const onSubmit = (formData: IFormData) => {
    dispatch(
      addExer({
        id: uuid(),
        exerName: formData.exerName,
        exerCount: Math.floor(formData.maxCount / 3),
        exerSetCount: formData.setCount,
        exerSetRestTerm: formData.setRestTerm,
      })
    );
    dispatch(addToggleSwitch(false));
  };
  return (
    <AddSection>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputEl>
          <Input
            {...register("exerName", {
              required: "운동 이름을 입력해주세요",
              validate: (value) =>
                exercises.find((exercise) => exercise.exerName === value)
                  ? "운동 이름이 중복됩니다."
                  : true,
            })}
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
