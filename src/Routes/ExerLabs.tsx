import React from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Item = styled.li`
  width: 90%;
  padding: 1em;
  border-radius: 15px;
  list-style-type: none;
  margin: 1em 0;
  ul {
    li {
      font-size: 0.9em;
      margin: 10px 0;
      h2 {
        font-weight: 600;
      }
    }
  }
`;
const Title = styled.h1`
  font-size: 1.2em;
  font-weight: 700;
  padding: 0.5em 0;
`;

export default function ExerLabs() {
  const exerNames = useAppSelector((state) =>
    state.exercise.map((exer) => exer.exerName)
  );
  return (
    <Container>
      {exerNames &&
        exerNames.map((name) => (
          <Item key={uuid()}>
            <Title>{name}</Title>
            <ul>
              <li>
                <h2>횟수 증가 그래프</h2>
                {/* <ReactApexChart
                  type="line"
                  options={{
                    chart: {
                      height: 500,
                      width: 500,
                    },
                  }}
                  series={[
                    {
                      name: "hello",
                      data: [4, 1, 5, 6, 4, 6],
                    },
                  ]}
                /> */}
              </li>
              <li>
                <h2>걸린 시간 그래프</h2>
              </li>
              <li>
                <h2>세트 수 그래프</h2>
              </li>
            </ul>
          </Item>
        ))}
    </Container>
  );
}
