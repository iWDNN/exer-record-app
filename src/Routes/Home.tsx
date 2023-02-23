import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ExerciseState } from "../features/exercise/exerciseSlice";
import { useAppSelector } from "../hooks";

const ListSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > ul {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Exercise = styled.li<{ isActive?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cdcdcd;
  border-radius: 7px;
  margin-bottom: 1em;
  padding: 1em;
  margin: 0 1em;
  div:first-child {
    h2 {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 2px;
    }
    ul {
      margin-top: 15px;
      display: flex;
      opacity: 0.8;
      li {
        font-size: 0.9em;
        margin-right: 10px;
        span {
          font-size: 1.1em;
          font-weight: 600;
        }
      }
    }
  }
  div:last-child {
    a {
      padding: 1em;
      border: 1px solid #eee;
      border-radius: 7px;
    }
  }
`;
export default function Home() {
  const exercise = useAppSelector((state) => state.exercise);
  return (
    <ListSection>
      <ul>
        {exercise.map((exer: ExerciseState) => (
          <Exercise key={exer.id}>
            <div>
              <h2>{exer.exerName}</h2>
              <ul>
                <li>
                  <span>{exer.exerCount}</span> count
                </li>
                <li>
                  <span>{exer.exerSetCount}</span> set
                </li>
              </ul>
            </div>
            <div>
              <Link to={`/play/${exer.id}`}>시작</Link>
            </div>
          </Exercise>
        ))}
      </ul>
    </ListSection>
  );
}
