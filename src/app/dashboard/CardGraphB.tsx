import { ForeCastWeather } from "@/state/api";
import React from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { epochToDate } from "../utils/utils";

type CardGraphBProps = {
  data: ForeCastWeather | void;
  isLoading: boolean;
  isError: boolean;
};

const CardGraphB = ({ data, isLoading, isError }: CardGraphBProps) => {
  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }
  // Count occurrences of each weather condition

  // Transform counts to an array suitable for Recharts PieChart

  const result: any = () => {
    const weatherCounts = data?.list.reduce((acc: any, item) => {
      const condition = item.weather[0].main;
      if (acc[condition]) {
        acc[condition]++;
      } else {
        acc[condition] = 1;
      }
      return acc;
    }, {});
    const fdata = Object?.entries(weatherCounts)?.map(([name, value]) => ({
      name,
      value,
    }));
    return fdata;
  };

  const COLORS = ["#0088FE", "#00C49F"];
  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-2 px-5 pt-3">5 Day Weather</h2>
      <hr />
      {isLoading ? (
        <div>Loading...</div>
      ) : result ? (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={result()}
                cx={200}
                cy={160}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {result().map((entry: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </>
      ) : (
        <>no data</>
      )}
    </div>
  );
};
export default CardGraphB;
