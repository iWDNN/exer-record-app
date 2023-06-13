import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { selectDeDupExerLogs } from "../redux/exercise/exerLogsSlice";
import { useAppSelector } from "../redux/hooks";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Item = styled.div`
  width: 150px;
  height: 170px;
  background-color: #616161;
  border-radius: 8px;
  padding: 10px;
  h2 {
    font-weight: 700;
  }
`;

export default function ExerLabs() {
  const exerLogs = useAppSelector((state) => state.exerLogs);
  const deDupList = useSelector(selectDeDupExerLogs);

  return (
    <Container>
      {exerLogs &&
        deDupList.map((exer) => (
          <Item key={uuid()}>
            <h2>
              <Link to={exer.id}>{exer.name} </Link>
            </h2>
          </Item>
        ))}
    </Container>
  );
}
