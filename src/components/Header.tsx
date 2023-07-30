import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { addToggleSwitch } from "../redux/toggle/toggleSlice";
import { useAppDispatch } from "../redux/hooks";

const Ct = styled.div`
  position: fixed;
  width: 94px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.mainColor};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  & > ul {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Logo = styled.div`
  padding: 1em 0;

  text-align: center;
  & > a {
    text-transform: uppercase;
    font-weight: 700;
  }
`;

const LinkEl = styled.li<{ isActive: boolean }>`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
  font-weight: 600;
  /* border-bottom: 2px solid #eee; */
  transition: 0.1s all ease-in-out;
  border-bottom: ${(props) => (props.isActive ? "2px solid #fff" : "none")};
  transition: all 0.2s ease-in-out;
  & > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
      <Logo>
        <Link to="/">exer record</Link>
      </Logo>
      <ul>
        <LinkEl isActive={pathname === "/"}>
          <Link to="/">
            <i className="fa-solid fa-dumbbell" />
          </Link>
        </LinkEl>
        <LinkEl isActive={pathname === "/logs"}>
          <Link to="/logs">
            <i className="fa-solid fa-list-ul" />
          </Link>
        </LinkEl>
        <LinkEl isActive={pathname === "/labs"}>
          <Link to="/labs">
            <i className="fa-solid fa-flask" />
          </Link>
        </LinkEl>
      </ul>
      {/* {pathname === "/" ? (
        <button onClick={() => dispatch(addToggleSwitch("toggle"))}>
          <i className="fa-solid fa-plus"></i>
        </button>
      ) : pathname.includes("play") ? (
        <Link to="/">
          <i className="fa-solid fa-reply"></i>
        </Link>
      ) : null} */}
    </Ct>
  );
}
