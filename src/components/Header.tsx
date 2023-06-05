import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { addToggleSwitch } from "../redux/toggle/toggleSlice";
import { useAppDispatch } from "../redux/hooks";

const Ct = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  align-items: center;
  * {
    padding: 0.5em 0;
    place-self: center;
  }
  ul {
    display: flex;
    align-items: center;
  }

  a {
    border: none;
    background-color: transparent;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
  }
  button,
  a {
    border: none;
    background-color: transparent;
    cursor: pointer;
    i {
      color: #fff;
      font-size: 1.1em;
      &:hover {
        color: #000;
      }
    }
  }
`;

const LinkEl = styled.li<{ isActive: boolean }>`
  margin: 0 10px;
  font-size: 0.9em;
  font-weight: 600;
  /* border-bottom: 2px solid #eee; */
  transition: 0.1s all ease-in-out;
  border-bottom: ${(props) => (props.isActive ? "2px solid #fff" : "none")};
  &:hover {
    color: #b4b4b4;
    /* border-bottom: 2px solid black; */
  }
`;

export default function Header() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  return (
    <Ct>
      <Link to="/">exer app</Link>
      <ul>
        <LinkEl isActive={pathname === "/"}>
          <Link to="/">목록</Link>
        </LinkEl>
        <LinkEl isActive={pathname === "/logs"}>
          <Link to="/logs">기록</Link>
        </LinkEl>
        <LinkEl isActive={pathname === "/labs"}>
          <Link to="/labs">분석</Link>
        </LinkEl>
      </ul>
      {pathname === "/" ? (
        <button onClick={() => dispatch(addToggleSwitch("toggle"))}>
          <i className="fa-solid fa-plus"></i>
        </button>
      ) : pathname.includes("play") ? (
        <Link to="/">
          <i className="fa-solid fa-reply"></i>
        </Link>
      ) : null}
    </Ct>
  );
}
