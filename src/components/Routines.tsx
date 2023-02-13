import React from "react";
import { useAppSelector } from "../hooks";

export default function Routines() {
  const exerStates = useAppSelector((state) => state.exercise);
  return (
    <ul>
      {exerStates.map((exer) => (
        <li key={exer.id}>{exer.id}</li>
      ))}
    </ul>
  );
}
