import React from "react";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";

const Ct = styled.div`
  width: 100%;
  background-color: #555;
`;

export default function LabDetail() {
  const { exerId } = useParams();
  const exerLogs = useAppSelector((state) => state.exerLogs).filter(
    (exer) => exer.exerId === exerId
  );

  return (
    <Ct>
      {exerLogs.map((exer) => (
        <div key={uuid()}>zzz</div>
      ))}
    </Ct>
  );
}
