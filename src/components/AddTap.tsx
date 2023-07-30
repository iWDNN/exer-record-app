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
  exerWeight: number;
  exerCount: number;
  setCount: number;
  setRestTerm: number;
}

const AddSection = styled(motion.section)`
  width: 100%;
  margin: 1em 0;
  /* background-color: #eee; */
  border-radius: 10px;
  padding: 1em;
  form {
    width: 100%;
    & > div {
      display: flex;
    }
    & > button {
      width: 100%;
      padding: 1em;
      border: none;
      border-radius: 10px;
      background-color: #4d484a;
      color: #fff;
      cursor: pointer;
      transition: 0.05s all ease-in-out;
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
const InputEl = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 0.1em;
  input {
    border-radius: 7px;
    background-color: ${(props) => props.theme.mainColor};
    border-right: 1px solid #4d484a;
  }
  span {
    margin-top: 5px;
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
  outline: none;
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
        exerId: uuid(),
        exerName: formData.exerName,
        exerCount: +formData.exerCount,
        exerSetCount: +formData.setCount,
        exerSetRestTerm: +formData.setRestTerm,
        exerWeight: formData.exerWeight ? +formData.exerWeight : 0,
      })
    );
    dispatch(addToggleSwitch(false));
  };
  return (
    <AddSection>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
              {...register("exerWeight", {
                pattern: {
                  value: /[0-9]/g,
                  message: "숫자만 입력해주세요",
                },
              })}
              placeholder="무게를 입력해주세요(기본 단위:kg)(없을시 공란으로 기재)"
            />
            <span>{errors.exerName?.message}</span>
          </InputEl>
        </div>
        <div>
          <InputEl>
            <Input
              {...register("exerCount", {
                required: "횟수를 입력해주세요",
                pattern: {
                  value: /[0-9]/g,
                  message: "숫자만 입력해주세요",
                },
              })}
              placeholder=" 횟수"
            />
            <span>{errors.exerCount?.message}</span>
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
        </div>
        <button>추가</button>
      </form>
    </AddSection>
  );
}
