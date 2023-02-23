import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../hooks";

const Container = styled.div`
  width: 235px;
  margin: 1em 0;
`;
const TimerDisplay = styled.div`
  h2 {
    text-align: center;
    font-size: 1.2em;
  }
  p {
    display: block;
    margin: 10px 0;
    font-size: 84px;
    font-weight: 300;
  }
  ul {
    li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
    }
  }
`;

const TimerControl = styled.div`
  & > div:first-child {
    display: flex;
    justify-content: space-evenly;
    button {
      width: 50%;
      padding: 0.5em 1em;
      border: 1px solid #181818;
      background-color: transparent;
    }
  }
`;
function Time(props: any) {
  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
    };
  }, []);
  return <p>00:01</p>;
}
export default function PlayExer() {
  const { exerId } = useParams();
  const [curExer] = useAppSelector((state) =>
    state.exercise.filter((exer) => exer.id === exerId)
  );
  const [toggle, setToggle] = useState(false);

  // 임시 코드
  const navigate = useNavigate();
  useEffect(() => {
    if (!curExer) {
      navigate("/");
    }
  }, []);
  return (
    <Container>
      <TimerDisplay>
        <h2>{curExer.exerName}</h2>
        {toggle ? <Time /> : <p>00:00</p>}
        <ul>
          <li>
            <span>count</span>
            <span>{curExer.exerCount}</span>
          </li>
          <li>
            <span>set</span>
            <span>0/{curExer.exerSetCount}</span>
          </li>
        </ul>
      </TimerDisplay>
      <TimerControl>
        <div>
          <button onClick={() => setToggle((prev) => !prev)}>시작</button>
          <button>완료</button>
        </div>
      </TimerControl>
    </Container>
  );
}
