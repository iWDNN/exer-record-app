import { useEffect, useRef } from "react";

export const formatTime = (sec: number) => {
  const mins = String(Math.floor(sec / 60)).padStart(2, "0");
  const secs = String(sec % 60).padStart(2, "0");
  return `${mins}:${secs}`;
};

export const countdown = (sec: number, useStateSetFunc: Function) => {
  let count = sec;
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      // console.log("count interval start");
      if (count === 0) {
        // console.log("count interval end");
        resolve("");
        clearInterval(interval);
      }
      await useStateSetFunc(count);
      count--;
    }, 1000);
  });
};

export const useInterval = (callback: any, delay: null | number) => {
  const savedCallback = useRef<any>();
  console.log("imalive");
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
