import { ForeCastWeather } from "@/state/api";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { epochToDate } from "../utils/utils";
import Title from "../(components)/Title";

type CardGraphAProps = {
  data: ForeCastWeather | void;
  isLoading: boolean;
  isError: boolean;
};

const CardGraphA = ({ data, isLoading, isError }: CardGraphAProps) => {
  return (
    <div
      className="row-span-3 col-span-2  xl:row-span-3 xl:col-span-1 md:row-span-2 md:col-span-1
      shadow-md rounded-2xl pb-16 bg-white bg-opacity-50"
    >
      <Title title="5 Day Temperature" />
      <hr />
      {isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <>
          <ResponsiveContainer width="100%" height={200} className="pt-3 pr-10">
            <LineChart
              width={500}
              height={300}
              data={data.list}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dt"
                tickFormatter={(value) => {
                  return epochToDate(value);
                }}
              />
              <YAxis />
              <Tooltip
                formatter={(value: number) => ["", `${value}°C`]}
                labelFormatter={(value) => {
                  return epochToDate(value);
                }}
              />
              <Legend formatter={() => "Temperature in °C"} />
              <Line
                type="monotone"
                dataKey="main.temp"
                stroke="#8884d8"
                activeDot={{ r: 2 }}
                dot={false}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <>no data</>
      )}
    </div>
  );
};
export default CardGraphA;
