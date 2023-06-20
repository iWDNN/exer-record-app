import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import ExerLabsItem from "../components/ExerLabsItem";
import { selectDeDupExerLogs } from "../redux/exercise/exerLogsSlice";
import { useAppSelector } from "../redux/hooks";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > section {
    width: 100%;
    display: flex;
    background-color: black;
    margin: 1em 0;
    padding: 1em 0;
    opacity: 0.9;
    h2 {
      padding: 1em 0;
    }
  }
  & > section:nth-child(1) {
    justify-content: space-evenly;
    align-items: center;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  & > section:nth-child(2) {
    flex-direction: column;
    & > ul {
      display: flex;
      & > li {
      }
    }
  }
`;

export default function ExerLabs() {
  const exerLogs = useAppSelector((state) => state.exerLogs);
  const deDupList = useSelector(selectDeDupExerLogs);

  return (
    <Container>
      <section>
        <div>
          <span>가장 많이 한 운동</span>
          <span>팔굽혀펴기</span>
          <>Chart</>
        </div>
        <div>
          <span>일주일 간 운동 소요시간</span>
          <span>00h 00m 00s</span>
          <>Chart</>
        </div>
        <div>
          <span>운동 총 소요시간</span>
          <span>00h 00m 00s</span>
          <>Chart</>
        </div>
      </section>
      <section>
        <h2>운동 종목 별 분석</h2>
        <ul>
          {exerLogs &&
            deDupList.map((exer) => (
              <li key={uuid()}>
                <Link to={exer.id}>
                  <ExerLabsItem exerInfo={exer} />
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </Container>
  );
}
