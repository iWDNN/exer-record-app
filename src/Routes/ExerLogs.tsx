import React from "react";
import styled from "styled-components";
const ExerLog = styled.section`
  ul {
    li {
      display: flex;
      margin: 1em 0;
      h4 {
        margin: 0 10px;
        span:first-child {
          margin-right: 10px;
        }
      }
    }
  }
`;
export default function ExerLogs() {
  return (
    <ExerLog>
      <h2>운동 기록</h2>
      <ul>
        <li>
          <h4>
            <span>운동 이름</span>
            <span>팔굽혀펴기</span>
          </h4>
          <h4>
            <span>횟수</span>
            <span>15</span>
          </h4>
          <h4>
            <span>세트 횟수</span>
            <span>3</span>
          </h4>
          <h4>
            <span>완료 날짜</span>
            <span>2013/05/13</span>
          </h4>
          <h4>
            <span>걸린시간</span>
            <span>189초</span>
          </h4>
        </li>
        <li>
          <h4>
            <span>운동 이름</span>
            <span>팔굽혀펴기</span>
          </h4>
          <h4>
            <span>횟수</span>
            <span>15</span>
          </h4>
          <h4>
            <span>세트 횟수</span>
            <span>3</span>
          </h4>
          <h4>
            <span>완료 날짜</span>
            <span>2013/05/13</span>
          </h4>
          <h4>
            <span>걸린시간</span>
            <span>189초</span>
          </h4>
        </li>
      </ul>
    </ExerLog>
  );
}
