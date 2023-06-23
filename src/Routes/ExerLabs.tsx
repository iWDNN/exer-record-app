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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > section {
    width: 100%;
    background-color: black;
    margin: 1em 0;
    padding: 1em 0;
    opacity: 0.9;
    h2 {
      padding: 1em 0;
    }
  }
  & > section:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
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
  & > section:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > ul {
      display: flex;
      & > li {
        margin: 0 10px;
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
  const perExerCountObj = useMemo(
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

  const maxObj = perExerCountObj.reduce((prev, value) =>
    prev.count >= value.count ? prev : value
  );
  const maxExerArr = perExerCountObj.filter(
    (exer) => exer.count === maxObj.count && exer
  );
  const lastDate = useMemo(
    () => new Date(Array.from(exerLogs).at(-1)?.date!).toLocaleDateString(),
    [exerLogs]
  );
  return (
    <Container>
      {exerLogs && (
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
                    data: perExerCountObj.map((obj) => obj.count),
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
                    categories: perExerCountObj.map((obj) => obj.name),
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
                  title: {
                    text: "운동 총 횟수",
                    style: {
                      color: "#fff",
                    },
                  },
                }}
              />
            </div>
            <div>
              <div>
                <span>가장 많이 한 운동</span>
                <span>
                  {maxExerArr.map((exer) => (
                    <span key={uuid()}>{exer.name}</span>
                  ))}
                </span>
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
                  {allReduceTime[0]}h {allReduceTime[1]}m {allReduceTime[2]}s
                </span>
              </div>
              <div>
                <span>가장 최근에 운동한 날짜</span>
                <span>{lastDate}</span>
              </div>
            </div>
          </section>
          <section>
            <h2>운동 종목 별 분석</h2>
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
      )}
    </Container>
  );
}
