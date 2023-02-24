import { createSlice } from "@reduxjs/toolkit";

export interface IRecord {
  id: string;
  date: string;
  name: string;
  allTime: number;
  detailTimes: number[];
  playSetCount: number;
  setCount: number;
  setRestTerm: number;
  exerCount: number;
  cmp: boolean;
}

export interface TimeRecordState {
  time: number;
  record: IRecord;
}

const initialState: TimeRecordState = {
  time: 0,
  record: {
    id: "",
    date: "",
    name: "",
    allTime: 0, // 운동하는데 걸린시간의 합
    detailTimes: [], // 운동 세트당 걸린 시간들 배열
    playSetCount: 0, // 지금까지 한 세트 횟수
    setCount: 0, // 총 세트 횟수
    setRestTerm: 0, // 휴식 시간 텀
    exerCount: 0, // 운동 횟수
    cmp: false, // 완료 여부
  },
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startSet: (state, { payload }) => {
      state.record.id = payload.id;
      state.record.name = payload.name;
      state.record.exerCount = payload.exerCount;
      state.record.setCount = payload.setCount;
      state.record.setRestTerm = payload.setRestTerm;
      state.record.date = payload.date;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    increase: (state) => {
      state.time += 1;
    },
    decrease: (state) => {
      state.time -= 1;
    },
    setClear: (state) => {
      state.record.detailTimes.push(state.time);
      state.record.playSetCount += 1;
      state.time = 0;
    },
    complete: (state) => {
      state.record.allTime = state.record.detailTimes.reduce(
        (a, b) => a + b,
        0
      );
      state.record.cmp = true;
    },
    reset: () => initialState,
  },
});

export const {
  startSet,
  setTime,
  increase,
  decrease,
  setClear,
  reset,
  complete,
} = timerSlice.actions;

export default timerSlice.reducer;
