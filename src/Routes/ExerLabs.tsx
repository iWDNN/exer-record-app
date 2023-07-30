import React, { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import ExerLabsItem from "../components/ExerLabsItem";
import { selectDeDupExerLogs } from "../redux/exercise/exerLogsSlice";
import { useAppSelector } from "../redux/hooks";
import { formatTime } from "../utils";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > header {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
    h1 {
      font-weight: 700;
      font-size: 1.5em;
      letter-spacing: 1px;
    }
    button {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 7px;
      background-color: ${(props) => props.theme.mainColor};
      color: #fff;
      font-size: 1.1em;
    }
  }
  & > section {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 1em 0;
    padding: 1em 0;
    opacity: 0.9;
    border-bottom: #eee;
    background-color: #2a2527;
  }
  & > section:nth-child(2) {
    justify-content: center;
    & > div {
    }
    & > div:nth-child(1) {
      & > div {
        color: black;
      }
    }
    & > div:nth-child(2) {
      margin-left: 40px;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      row-gap: 80px;
      align-items: center;
      & > div {
        width: 250px;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;

        & > span:first-child {
          font-size: 1.2em;
        }
        & > span:last-child {
          margin-top: 5px;
          font-size: 1.6em;
          font-weight: 700;
          & > span::after {
            content: ", ";
          }
          & > span:last-child::after {
            content: "";
          }
        }
      }
    }
  }
  & > section:nth-child(4) {
    padding: 1em;
    & > ul {
      display: flex;
      & > li {
        margin: 0 1em;
      }
    }
  }
`;

export default function ExerLabs() {
  const exerLogs = useAppSelector((state) => state.exerLogs);
  const deDupList = useSelector(selectDeDupExerLogs);
  const allReduceTime = useMemo(
    () =>
      formatTime(
        exerLogs
          .map((exerLogs) => exerLogs.recordList.reduce((a, b) => a + b, 0))
          .reduce((a, b) => a + b, 0),
        "arr"
      ),
    [exerLogs]
  );
  const simpleExer = useMemo(
    () =>
      Array.from(deDupList).map((deDupExer) => {
        let count = exerLogs.filter(
          (exer) => exer.exerName === deDupExer.name
        ).length;
        return {
          name: deDupExer.name,
          count,
        };
      }),
    [exerLogs]
  );

  const mostExer = useMemo(() => {
    const nameList = exerLogs.map((exer) => exer.exerName); // ['a','b','a','c','d']
    const result: any = {}; // {}
    nameList.forEach((x) => {
      // x 'a'
      result[x] = (result[x] || 0) + 1;
    });
    let maxObj = {
      key: "",
      value: 0,
    };
    Object.entries(result).forEach(([key, value]: any) => {
      if (value > maxObj.value) {
        maxObj.key = key;
        maxObj.value = value;
      }
    });
    return maxObj;
  }, [exerLogs]);

  const lastDate = useMemo(
    () => new Date(Array.from(exerLogs).at(-1)?.date!).toLocaleDateString(),
    [exerLogs]
  );
  return (
    <Container>
      <header>
        <h1>운동 분석</h1>
      </header>
      {JSON.stringify(exerLogs) !== (JSON.stringify([]) as any) ? (
        <>
          <section>
            <div>
              <ReactApexChart
                type="bar"
                width="250"
                height="300"
                series={[
                  {
                    name: "",
                    data: simpleExer.map((obj) => obj.count),
                  },
                ]}
                options={{
                  chart: {
                    type: "bar",
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 10,
                      dataLabels: {
                        position: "top", // top, center, bottom
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                      return val + "회";
                    },
                    offsetY: -20,
                    style: {
                      fontSize: "12px",
                      colors: ["#fff"],
                    },
                  },
                  xaxis: {
                    categories: simpleExer.map((obj) => obj.name),
                    position: "top",
                    axisBorder: {
                      show: false,
                    },
                    axisTicks: {
                      show: true,
                    },
                    crosshairs: {
                      fill: {
                        type: "gradient",
                        gradient: {
                          colorFrom: "#D8E3F0",
                          colorTo: "#BED1E6",
                          stops: [0, 100],
                          opacityFrom: 0.4,
                          opacityTo: 0.5,
                        },
                      },
                    },
                    labels: {
                      style: {
                        fontSize: "12px",
                        colors: "#fff",
                      },
                    },
                    tooltip: {
                      enabled: false,
                    },
                  },
                  yaxis: {
                    tickAmount: 1,
                    min: 0,
                    max:
                      Math.ceil(
                        Math.max(...simpleExer.map((exer) => exer.count)) * 0.1
                      ) * 10,
                    axisBorder: {
                      show: false,
                    },
                    axisTicks: {
                      show: false,
                    },
                    labels: {
                      formatter: function (val) {
                        return val + "회";
                      },
                      style: {
                        colors: "#fff",
                      },
                    },
                  },
                }}
              />
            </div>
            <div>
              <div>
                <span>가장 많이 한 운동</span>
                <span>{mostExer.key}</span>
              </div>
              <div>
                <span>운동 세트 완수율</span>
                <span>
                  {Math.floor(
                    (exerLogs.filter((exer) => exer.cmp).length /
                      exerLogs.length) *
                      100
                  )}
                  %
                </span>
              </div>
              <div>
                <span>운동 총 소요시간</span>
                <span>
                  {allReduceTime[0]}m {allReduceTime[1]}s {allReduceTime[2]}ms
                </span>
              </div>
              <div>
                <span>마지막에 운동한 날짜</span>
                <span>{lastDate}</span>
              </div>
            </div>
          </section>
          <header>
            <h1>운동 별 분석</h1>
          </header>
          <section>
            <ul>
              {exerLogs &&
                deDupList.map((exer) => (
                  <li key={uuid()}>
                    <Link to={exer.id}>
                      <ExerLabsItem exerInfo={exer} />
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </>
      ) : (
        <section>
          <h1>운동 기록이 없습니다</h1>
        </section>
      )}
    </Container>
  );
}
