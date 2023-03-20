import React from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppSelector } from "../hooks";

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
  border: 1px solid black;
  border-radius: 15px;
  list-style-type: none;
  margin: 1em 0;
`;
const Title = styled.h1`
  font-size: 1.2em;
  padding: 0.5em 0;
`;

export default function ExerLabs() {
  const exerNames = useAppSelector((state) =>
    state.exercise.map((exer) => exer.exerName)
  );
  const exerLogs = useAppSelector((state) => state.exerLogs);
  console.log(exerNames);
  console.log(exerLogs);
  return (
    <Container>
      {exerNames &&
        exerNames.map((name) => (
          <Item key={uuid()}>
            <Title>{name}</Title>
            <ul>
              <li>횟수 증가 그래프</li>
              <li>걸린 시간 그래프</li>
              <li>세트 수 그래프</li>
            </ul>
          </Item>
        ))}
    </Container>
  );
}
