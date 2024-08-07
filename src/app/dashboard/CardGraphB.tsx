import { ForeCastWeather } from "@/state/api";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "../(components)/Title";

type CardGraphBProps = {
  data: ForeCastWeather | void;
  isLoading: boolean;
  isError: boolean;
};

const CardGraphB = ({ data, isLoading, isError }: CardGraphBProps) => {
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div
      className="row-span-3 col-span-2 xl:row-span-3 xl:col-span-1 md:row-span-2 md:col-span-1
      shadow-md rounded-2xl justify-between bg-white bg-opacity-50"
    >
      <Title title="5 Day Weather" />
      <hr />
      {isLoading ? (
        <div>Loading...</div>
      ) : result ? (
        <div className="flex pr-7">
          <div className="relative basis-3/5">
            <ResponsiveContainer width={300} height={250}>
              <PieChart>
                <Pie
                  data={result()}
                  cx={150}
                  cy={110}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {result().map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                {/* <Legend /> */}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <>no data</>
      )}
    </div>
  );
};
export default CardGraphB;
