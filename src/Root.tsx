import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "./redux/hooks";
import AddTap from "./components/AddTap";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
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
  const addTg = useAppSelector((state) => state.toggle.addToggle);
  return (
    <Container>
      <Header />
      <Page>
        <Outlet />
      </Page>
    </Container>
  );
}

export default Root;
