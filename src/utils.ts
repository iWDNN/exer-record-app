import { useEffect, useRef } from "react";

export const formatTime = (sec: number, returnType: string) => {
  const mins = String(Math.floor(sec / 6000)).padStart(2, "0");
  const secs = String(Math.floor((sec % 6000) / 100)).padStart(2, "0");
  const mls = String(sec % 100).padStart(2, "0");
  if (returnType === "arr") return [mins, secs, mls];
  else if (returnType === "str") return `${mins}:${secs}.${mls}`;
  else return "returnType Error";
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
