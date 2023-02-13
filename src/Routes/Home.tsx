import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import styled from "styled-components";
import Routines from "../components/Routines";
import { add } from "../features/exercise/exerciseSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

interface IFormInput {
  exerName: string;
  level: string;
  maxCount: number;
  setCount: number;
  restTerm: number;
  startDate: string;
}

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5em;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    padding: 3em;
    font-size: 24px;
    font-weight: bolder;
  }
`;
const AddSection = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    width: 100%;
    display: flex;
    margin-top: 10px;
    * {
      width: 100%;
    }
  }
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 19% 19% 19% 19% 19% 5%;
    * {
      place-self: center;
    }
  }
`;

function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const dispatch = useAppDispatch();

  const onSubmit = (formInputData: IFormInput) => {
    if (formInputData) {
      formInputData.startDate = String(new Date());
      dispatch(add(formInputData));
    }
  };
  return (
    <Container>
      <Header>
        <h1>HEALTH CARE APP</h1>
        <AddSection>
          <section>
            {/* - 필요 자원 : id, startDate / type,level,maxCount,[휴식주기(?), 세트수(?)] */}
            <span>운동 이름</span>
            <span>난이도</span>
            <span>최대 가능한 횟수</span>
            <span>휴식 주기</span>
            <span>세트 수</span>
          </section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section>
              <div>
                <input
                  {...register("exerName", {
                    required: "운동 이름을 입력해주세요",
                  })}
                />
                <span>{errors.exerName && errors.exerName.message}</span>
              </div>
              <div>
                <select
                  defaultValue="normal"
                  {...register("level", { required: "난이도를 선택해주세요" })}
                >
                  <option value="hard">상</option>
                  <option value="normal">중</option>
                  <option value="easy">하</option>
                </select>
                <span>{errors.level && errors.level.message}</span>
              </div>
              <div>
                <input
                  {...register("maxCount", {
                    required: "최대 가능 횟수를 입력해주세요",
                    pattern: {
                      value: /[0-9]/,
                      message: "숫자만 입력해주세요",
                    },
                  })}
                />
                <span>{errors.maxCount && errors.maxCount.message}</span>
              </div>
              <div>
                <input
                  {...register("restTerm", {
                    required: "휴식 주기를 입력해주세요",
                    pattern: {
                      value: /[0-9]/,
                      message: "숫자만 입력해주세요",
                    },
                  })}
                />
                <span>{errors.restTerm && errors.restTerm.message}</span>
              </div>
              <div>
                <input
                  {...register("setCount", {
                    required: "세트 횟수를 입력해주세요",
                    pattern: {
                      value: /[0-9]/,
                      message: "숫자만 입력해주세요",
                    },
                  })}
                />
                <span>{errors.setCount && errors.setCount.message}</span>
              </div>
              <button>Add</button>
            </section>
          </form>
        </AddSection>
      </Header>
      <Routines />
    </Container>
  );
}

export default Home;
