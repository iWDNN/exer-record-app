import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../hooks";

const Container = styled.div``;

export default function ExerLabs() {
  const records = useAppSelector((state) => state.exerLogs);
  const exercises = useAppSelector((state) => state.exercise);

  const sortArr = exercises.map((exercise) =>
    records
      .filter((record) => record.name === exercise.exerName)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  );
  console.log(sortArr);

  return (
    <Container>
      {sortArr &&
        sortArr.map((arr) =>
          arr.map((record) => (
            <li>
              {record.name} {record.date}
            </li>
          ))
        )}
    </Container>
  );
}
