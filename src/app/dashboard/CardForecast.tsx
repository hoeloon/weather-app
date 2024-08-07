import { ForeCastWeather } from "@/state/api";
import React from "react";
import Image from "next/image";
import Title from "../(components)/Title";

type CardForecastProps = {
  data: ForeCastWeather | void;
  isLoading: boolean;
  isError: boolean;
};

const gmtOffset = 8 * 60 * 60; // 8 hours in seconds

// Function to convert epoch time to day of the week
function getDayOfWeek(epochTime: number) {
  const date = new Date((epochTime + gmtOffset) * 1000); // Convert to milliseconds
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getUTCDay()];
}

function groupByDay(data: any) {
  return data.reduce((acc: any, item: any) => {
    const day = getDayOfWeek(item.dt);
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(item);
    return acc;
  }, {});
}

function formatTime(unixTimestamp: number) {
  const date = new Date((unixTimestamp + gmtOffset) * 1000);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

const CardForecast = ({ data, isLoading, isError }: CardForecastProps) => {
  const groupedData = data ? groupByDay(data?.list) : {};
  return (
    <div
      className="row-span-3 col-span-2  xl:row-span-7 xl:col-span-1 md:row-span-4 md:col-span-1
      shadow-md rounded-2xl pb-16 bg-white bg-opacity-50"
    >
      {" "}
      <Title title="5 Day Forecast (3 Hours)" />
      <hr />
      {isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <>
          {" "}
          <div className="overflow-auto h-full scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin scrollbar-track-transparent">
            {Object.entries(groupedData).map(([key, value]: any) => (
              <div className="flex flex-col gap-3 px-5 py-7 border-b" key={key}>
                <span className="text-lg text-gray-500">{key}</span>
                <div>
                  {value.map((item: any, index: number) => (
                    <div
                      className="flex gap-1 justify-between items-center"
                      key={index}
                    >
                      <div className="flex items-center">
                        <span className="px-1">{formatTime(item.dt)}</span>

                        <span className="text-gray-700"></span>
                      </div>
                      <div className="flex items-center">
                        {" "}
                        <Image
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          alt="test"
                          width={50}
                          height={50}
                        />
                        <span className="text-gray-700 justify-end">
                          {item.weather[0].main}
                        </span>
                      </div>

                      <div className="flex">
                        <span className="text-gray-700 font-semibold">
                          <p></p>
                          {item.main.temp_min.toFixed(0)}
                        </span>
                        <span className="text-gray-700">
                          <p></p>/{item.main.temp_max.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>no data</>
      )}
    </div>
  );
};

export default CardForecast;
