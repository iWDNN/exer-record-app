import React from "react";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";
import styled from "styled-components";
import { add, ExerciseState } from "./features/exercise/exerciseSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

interface IFormData {
  exerName: string;
  maxCount: string;
  setCount: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  section {
    margin: 2em;
  }
`;
const AddSection = styled.section`
  h2 {
    padding: 10px;
    font-weight: bolder;
    text-align: center;
  }
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
const ListSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  ul {
    display: flex;
    li {
      border: 1px solid black;
      border-radius: 7px;
      margin: 1em;
      padding: 1em;
      font-size: 0.8em;
      h4 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin: 1em 0;
        span:first-child {
          font-weight: bold;
          margin-right: 5px;
        }
        span:last-child {
        }
      }
    }
  }
`;
const Timer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  padding: 20px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 1.2em;
      font-weight: 600;
    }
    div {
      span:first-child {
        font-size: 0.8em;
        margin-right: 10px;
      }
      span:last-child {
        font-weight: 600;
        font-size: 1.2em;
      }
    }
  }
  p {
    margin-top: 10px;
    font-size: 124px;
    font-weight: 800;
  }
`;

function App() {
  const { register, handleSubmit, setValue } = useForm<IFormData>();
  const exercise = useAppSelector((state) => state.exercise);
  const dispatch = useAppDispatch();
  const onSubmit = (data: IFormData) => {
    const result: ExerciseState = {
      id: uuid(),
      exerName: data.exerName,
      exerCount: String(Math.floor(+data.maxCount / 2 + +data.maxCount / 4)),
      exerSetCount: data.setCount,
    };
    dispatch(add(result));
    setValue("exerName", "");
    setValue("maxCount", "");
    setValue("setCount", "");
  };
  console.log(exercise);
  return (
    <Container>
      <AddSection>
        <h2>운동 앱 테스트</h2>
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
      <ListSection>
        <ul>
          {exercise.map((exer: ExerciseState) => (
            <li key={exer.id}>
              <h4>
                <span>운동 이름</span>
                <span>{exer.exerName}</span>
              </h4>
              <h4>
                <span>횟수</span>
                <span>{exer.exerCount}</span>
              </h4>
              <h4>
                <span>세트 횟수</span>
                <span>{exer.exerSetCount}</span>
              </h4>
            </li>
          ))}
          <li>
            <h4>
              <span>운동 이름</span>
              <span>턱걸이</span>
            </h4>
            <h4>
              <span>횟수</span>
              <span>7</span>
            </h4>
            <h4>
              <span>세트 횟수</span>
              <span>3</span>
            </h4>
          </li>
          <li>
            <h4>
              <span>운동 이름</span>
              <span>스쿼트</span>
            </h4>
            <h4>
              <span>횟수</span>
              <span>30</span>
            </h4>
            <h4>
              <span>세트 횟수</span>
              <span>3</span>
            </h4>
          </li>
        </ul>
      </ListSection>
      <Timer>
        <header>
          <h2>팔굽혀펴기</h2>
          <div>
            <span>세트횟수</span>
            <span>0 / 3</span>
          </div>
        </header>
        <p>00:00</p>
      </Timer>
    </Container>
  );
}

export default App;
