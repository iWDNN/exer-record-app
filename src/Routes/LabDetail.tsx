import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";

const Ct = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
  & > h1 {
    font-size: 1.5em;
    font-weight: 600;
  }
  & > section {
    width: 100%;
    margin: 1em 0;
    border-bottom: #eee;
    opacity: 0.9;
    & > div {
      display: flex;
      padding: 1em;
    }
  }
  & > section:nth-child(2) {
    display: flex;
    background-color: #2a2527;
  }
  & > section:nth-child(3) {
    display: grid;

    & > div {
      flex-direction: column;
      background-color: #2a2527;
      & > div:nth-child(1) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h2 {
          font-size: 1.2em;
          font-weight: 700;
        }
        & > div {
          width: 50%;
          color: #000;
        }
      }
    }
  }
`;
const OverView = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  color: #fff;
  span {
    display: block;
  }
  span:first-child {
    font-size: 1.2em;
    font-weight: 700;
  }
  span:last-child {
    font-size: 1.4em;
    margin-top: 1em;
    font-weight: 600;
  }
`;

export default function LabDetail() {
  const { exerId } = useParams();
  const exerList = useAppSelector((state) => state.exerLogs);
  const selectedExerLogs = exerList.filter((exer) => exer.exerId === exerId);

  return (
    <Ct>
      <>
        <h1>{selectedExerLogs[0].exerName}</h1>

        <section>
          <OverView>
            <OverViewItem>
              <span>세트 완수율</span>
              <span>
                {(
                  exerList
                    .filter(
                      (exer) => exer.exerId === selectedExerLogs[0].exerId
                    )
                    .filter((exer) => exer.cmp).length /
                  exerList.filter(
                    (exer) => exer.exerId === selectedExerLogs[0].exerId
                  ).length
                ).toFixed(2)}
                %
              </span>
            </OverViewItem>
            <OverViewItem>
              <span>운동 시작한 날짜</span>
              <span>
                {new Date(selectedExerLogs[0].date).toLocaleDateString()}
              </span>
            </OverViewItem>
            <OverViewItem>
              <span>가장 최근에 운동한 날짜</span>
              <span>
                {new Date(exerList.slice(-1)[0].date).toLocaleDateString()}
              </span>
            </OverViewItem>
          </OverView>
        </section>
        <section>
          <div>
            <div>
              <h2>무게 / 횟수 추이도</h2>
              <div>
                {selectedExerLogs.length > 1 ? (
                  <>
                    <ReactApexChart
                      type="line"
                      series={[
                        {
                          name: "weight",
                          data: selectedExerLogs.map((exer) => exer.exerWeight),
                        },
                        {
                          name: "count",
                          data: selectedExerLogs.map(
                            (exer) => exer.performedSetCount
                          ),
                        },
                      ]}
                      options={{
                        chart: {
                          type: "line",
                        },
                        xaxis: {
                          labels: {
                            style: {
                              fontSize: "12px",
                              colors: "#fff",
                            },
                          },
                        },
                        yaxis: {
                          labels: {
                            style: {
                              fontSize: "12px",
                              colors: "#fff",
                            },
                          },
                        },
                      }}
                    />
                  </>
                ) : (
                  <OverView>
                    <OverViewItem>
                      2회 이상의 운동기록이 필요합니다
                    </OverViewItem>
                  </OverView>
                )}
              </div>
            </div>
            {/* <OverView></OverView> */}
          </div>
        </section>
      </>
    </Ct>
  );
}
