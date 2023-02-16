import React from "react";
import styled from "styled-components";

const Container = styled.div`
  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  section:first-child {
    margin: 0.5em;
    h1 {
      font-weight: 600;
      margin: 0 0.5em;
    }
    form {
      display: flex;
      /* flex-direction: column;
      align-items: center; */
      input {
        padding: 1em;
        border: 1px solid #eee;
        /* border: none; */
      }
    }
    button {
      padding: 1em;
      border: none;
      background-color: #e3e3e3;
    }
  }
  section:nth-child(2) {
    ul {
      border: 1px solid #e3e3e3;
    }
  }
`;
const ExerItem = styled.div`
  table {
    thead {
      th {
        font-size: 0.8em;
        padding: 1em;
      }
    }
    tbody {
      td {
        font-size: 0.85em;
        padding: 1em;
      }
    }
    border-bottom: 1px solid #e3e3e3;
  }
`;

function Home() {
  return (
    <Container>
      <section>
        <h1>Health care app</h1>
        <form>
          <input placeholder="이름" />
          <input placeholder="최대횟수" />
          <input placeholder="세트 수" />
          <input placeholder="세트 휴식 시간" />
          <input placeholder="운동 휴식 시간" />
        </form>
        <button>추가</button>
      </section>
      <section>
        <ul>
          <ExerItem>
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>횟수</th>
                  <th>세트</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>팔굽혀펴기</td>
                  <td>15</td>
                  <td>3 set</td>
                </tr>
              </tbody>
            </table>
          </ExerItem>
          <ExerItem>
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>횟수</th>
                  <th>세트</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>팔굽혀펴기</td>
                  <td>15</td>
                  <td>3 set</td>
                </tr>
              </tbody>
            </table>
          </ExerItem>
        </ul>
      </section>
    </Container>
  );
}

export default Home;
