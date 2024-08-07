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

type CardGraphAProps = {
  data: ForeCastWeather | void;
  isLoading: boolean;
  isError: boolean;
};

const CardGraphA = ({ data, isLoading, isError }: CardGraphAProps) => {
  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }
  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-2 px-5 pt-3">
        5 Day Temperature
      </h2>
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
        <>"no data"</>
      )}
    </div>
  );
};
export default CardGraphA;
