import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IExerciseState } from "../features/exercise/exerciseSlice";

interface IExerItemProps {
  exerData: IExerciseState;
}

const Ct = styled.li`
  display: flex;
  align-items: center;
  min-width: 250px;
  background-color: #2b2529;
  border-radius: 10px;
  * {
  }
  & > div {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 1em;
    & > * {
    }
    & > h1 {
      flex-shrink: 0;
      flex-grow: 1;
      font-size: 2em;
      font-weight: 700;
      letter-spacing: 2px;
    }

    & > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 10px;
      & > div {
        display: flex;
        align-items: center;
        margin: 5px;
        span {
          display: block;
        }
        span:first-child {
          margin-right: 5px;
          font-size: 0.8em;
        }
        span:nth-child(2) {
          margin-right: 3px;
        }
        span:last-child {
          font-size: 0.65em;
        }
      }
    }
    & > div:nth-child(3) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      & > * {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        border: none;
        width: 25px;
        height: 25px;
        margin: 0.25em;
        i {
          color: #fff;
        }
      }
      a:nth-child(1) {
        background-color: ${(props) => props.theme.green};
      }
      button:nth-child(2) {
        background-color: ${(props) => props.theme.yellow};
      }
      button:nth-child(3) {
        background-color: ${(props) => props.theme.red};
      }
    }
  }
`;

export default function ExerItem({ exerData }: IExerItemProps) {
  return (
    <Ct>
      <div>
        <h1>{exerData.exerName}</h1>
        <div>
          <div>
            <span>세트</span>
            <span>{exerData.exerSetCount}</span>
            <span>세트</span>
          </div>
          <div>
            <span>횟수</span>
            <span>{exerData.exerCount}</span>
            <span>회</span>
          </div>
          <div>
            <span>휴식</span>
            <span>{exerData.exerSetRestTerm}</span>
            <span>초</span>
          </div>
        </div>
        <div>
          <Link to={`/play/${exerData.id}`}>
            <i className="fa-solid fa-play"></i>
          </Link>
          <button>
            <i className="fa-solid fa-gear"></i>
          </button>
          <button>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </Ct>
  );
}
