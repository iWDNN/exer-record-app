import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  delExer,
  IExerciseState,
  uptExer,
} from "../redux/exercise/exerciseSlice";
import { useAppDispatch } from "../redux/hooks";

interface IExerItemProps {
  exerData: IExerciseState;
}

const Ct = styled.li`
  height: 110px;
  display: flex;
  flex-direction: column;
  background-color: #2b2529;
  border-radius: 10px;
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
  box-sizing: border-box;
  @media screen and (max-width: 1439px) {
    height: 100%;
  }
`;

const InfoCt = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 40% 40% 20%;
  align-items: center;
  padding: 1em;

  & > div:nth-child(1) {
    pointer-events: none;
    h1 {
      text-align: center;
      flex-shrink: 0;
      flex-grow: 1;
      font-size: 2em;
      font-weight: 700;
      letter-spacing: 2px;
    }
  }

  & > div:nth-child(2) {
    pointer-events: none;
    display: flex;
    /* justify-content: space-evenly; */
    align-items: center;
    margin-top: 10px;
    & > div {
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-right: 2px solid #4e494b;
      border-radius: 1px;
      &:first-child {
        border-left: 2px solid #4e494b;
      }
      span {
        display: block;
      }
      span:first-child {
        margin-right: 5px;
        font-size: 0.8em;
      }
      span:nth-child(2) {
        margin-right: 3px;
      }
      span:last-child {
        font-size: 0.65em;
      }
    }
  }
  & > div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    & > * {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      border: none;
      width: 25px;
      height: 25px;
      margin: 0 0.5em;
      i {
        color: #fff;
      }
    }
    a:nth-child(1) {
      background-color: ${(props) => props.theme.green};
    }
    button:nth-child(2) {
      background-color: ${(props) => props.theme.yellow};
    }
    button:nth-child(3) {
      background-color: ${(props) => props.theme.red};
    }
  }
`;

const UpdateCt = styled.div`
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  background-color: #362f33;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  * {
    background-color: transparent;
    color: #fff;
    text-align: center;
  }
  form {
    width: 100%;
    display: grid;
    grid-template-columns: 40% 40% 20%;
    align-items: center;
    & > div {
      display: flex;

      align-items: center;
      font-size: 0.8em;
      padding: 10px 0;
      input {
        padding: 5px 0;
        border: none;
        outline: none;
        background-color: #4e494b;
        border-radius: 7px;
      }
    }
    & > div:nth-child(1) {
      justify-content: space-evenly;
      input {
        width: 70%;
      }
    }
    & > div:nth-child(2) {
      input {
        width: 20px;
      }
      & > div {
        padding: 0 10px;
        span {
          pointer-events: none;
        }
      }
    }
    & > div:nth-child(3) {
      justify-content: space-evenly;
      button {
        cursor: pointer;
        padding: 0.5em 0.75em;
        margin: 0 0.25em;
        border: none;
        background-color: #4e494b;
        border-radius: 6px;
      }
    }
  }
`;

export default function ExerItem({ exerData }: IExerItemProps) {
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState(false);
  const onClickUpdate = () => {
    setToggle((prev) => !prev);
  };
  const onClickDel = (id: string) => {
    dispatch(delExer(id));
  };

  const { exerId, ...otherExerData } = exerData;
  const { register, handleSubmit } = useForm<IExerciseState>({
    defaultValues: otherExerData,
  });

  const onSubmit = (formData: IExerciseState) => {
    const result = formData;
    result.exerId = exerData.exerId;
    dispatch(uptExer(result));
    setToggle(false);
  };
  return (
    <Ct>
      <InfoCt>
        <div>
          <h1>{exerData.exerName}</h1>
        </div>
        <div>
          <div>
            <span>세트</span>
            <span>{exerData.exerSetCount}</span>
            <span>세트</span>
          </div>
          <div>
            <span>횟수</span>
            <span>{exerData.exerCount}</span>
            <span>회</span>
          </div>
          <div>
            <span>휴식</span>
            <span>{exerData.exerSetRestTerm}</span>
            <span>초</span>
          </div>
        </div>
        <div>
          <Link to={`/play/${exerData.exerId}`}>
            <i className="fa-solid fa-play"></i>
          </Link>
          <button
            onClick={() => {
              onClickUpdate();
            }}
          >
            <i className="fa-solid fa-gear"></i>
          </button>
          <button
            onClick={() => {
              onClickDel(exerData.exerId);
            }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </InfoCt>
      {toggle && (
        <UpdateCt>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input {...register("exerName")} placeholder="운동 이름" />
            </div>
            <div>
              <div>
                <span>세트</span>
                <input {...register("exerSetCount")} type="number" />
                <span>세트</span>
              </div>
              <div>
                <span>횟수</span>
                <input {...register("exerCount")} type="number" />
                <span>회</span>
              </div>
              <div>
                <span>휴식</span>
                <input {...register("exerSetRestTerm")} type="number" />
                <span>초</span>
              </div>
            </div>
            <div>
              <button>변경</button>
              <button
                onClick={() => {
                  setToggle(false);
                }}
              >
                취소
              </button>
            </div>
          </form>
        </UpdateCt>
      )}
    </Ct>
  );
}
