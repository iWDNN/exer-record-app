import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { addToggleSwitch } from "./features/toggle/toggleSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import AddExer from "./Routes/AddExer";
import { AnimatePresence } from "framer-motion";

const Container = styled.div`
  width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  header {
    display: grid;
    grid-template-columns: 25% 50% 25%;
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
        color: #383838;
        font-size: 1.1em;
        &:hover {
          color: #000;
        }
      }
    }
  }
`;
const LinkEl = styled.li<{ isActive: boolean }>`
  margin: 0 10px;
  color: #383838;
  font-size: 0.9em;
  font-weight: 600;
  /* border-bottom: 2px solid #eee; */
  transition: 0.1s all ease-in-out;
  border-bottom: ${(props) => (props.isActive ? "2px solid black" : "none")};
  &:hover {
    color: #000;
    /* border-bottom: 2px solid black; */
  }
`;
const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function Root() {
  const { pathname } = useLocation();
  const addTg = useAppSelector((state) => state.toggle.addToggle);
  const dispatch = useAppDispatch();
  return (
    <Container>
      <header>
        <Link to="/">exer app</Link>
        <ul>
          <LinkEl isActive={pathname === "/"}>
            <Link to="/">운동리스트</Link>
          </LinkEl>
          <LinkEl isActive={pathname === "/logs"}>
            <Link to="/logs">운동기록</Link>
          </LinkEl>
          <LinkEl isActive={pathname === "/labs"}>
            <Link to="/labs">운동분석</Link>
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
      </header>
      <Page>
        <AnimatePresence>{addTg && <AddExer />}</AnimatePresence>
        <Outlet />
      </Page>
    </Container>
  );
}

export default Root;
