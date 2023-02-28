import { createSlice } from "@reduxjs/toolkit";

export interface IRecord {
  id: string;
  date: string;
  name: string;
  detailTimes: number[];
  playSetCount: number;
  setCount: number;
  setRestTerm: number;
  exerCount: number;
  cmp: boolean;
}

export interface TimeRecordState {
  time: number;
  isRest: boolean;
  record: IRecord;
}

const initialState: TimeRecordState = {
  time: 0,
  isRest: false,
  record: {
    id: "",
    date: "",
    name: "",
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
    setIsRest: (state, action) => {
      state.isRest = action.payload;
    },
    startSet: (state, { payload }) => {
      state.record.id = payload.id;
      state.record.name = payload.name;
      state.record.exerCount = payload.exerCount;
      state.record.setCount = payload.setCount;
      state.record.setRestTerm = payload.setRestTerm;
      state.record.date = payload.date;
    },
    setClear: (state) => {
      state.record.detailTimes.push(state.time);
      state.record.playSetCount += 1;
      if (state.record.playSetCount >= state.record.setCount) {
        state.record.cmp = true;
      }
      state.time = 0;
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
    reset: () => initialState,
  },
});

export const {
  setIsRest,
  startSet,
  setClear,
  setTime,
  increase,
  decrease,
  reset,
} = timerSlice.actions;

export default timerSlice.reducer;
