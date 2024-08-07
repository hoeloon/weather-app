import { CurrentWeather } from "@/state/api";
import React from "react";
import Image from "next/image";
import {
  ArrowDownLeft,
  CircleGauge,
  Droplet,
  Haze,
  Thermometer,
  Wind,
} from "lucide-react";
import WindDirection from "./WindDirection";
import Title from "../(components)/Title";

type CardTodayWeatherProps = {
  data: CurrentWeather | void;
  isLoading: boolean;
  isError: boolean;
};

const CardTodayWeather = ({
  data,
  isLoading,
  isError,
}: CardTodayWeatherProps) => {
  return (
    <div
      className="row-span-3 col-span-2 xl:row-span-4 xl:col-span-1 md:row-span-2 md:col-span-1
      shadow-md rounded-2xl pb-16 bg-white bg-opacity-50"
    >
      <Title title="Today Highlight" />
      <hr />
      {isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <div className="">
          <div className="flex justify-between items-center pb-4">
            <span className="text-5xl p-10 text-gray-700">
              {data.name}, {data.sys.country}{" "}
            </span>
            <div className="flex flex-col items-center">
              <Image
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                width={150}
                height={150}
              />
              <span className="capitalize font-bold text-gray-500">
                {data.weather[0].description}
              </span>
            </div>
          </div>
          <hr />
          <div className="flex justify-between p-4 px-10">
            <div className="flex flex-col items-center">
              <div>
                <Thermometer className="w-10 h-10" />
              </div>
              <span>{data.main.temp}°C</span>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <Droplet className="w-10 h-10" />
              </div>
              <span>{data.main.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <CircleGauge className="w-10 h-10" />
              </div>
              <span>{data.main.pressure}hPa</span>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <Haze className="w-10 h-10" />
              </div>
              <span>{data.visibility / 1000}km</span>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <Wind className="w-10 h-10" />
              </div>
              <div className="flex">
                <WindDirection wind={data.wind} />
                {data.wind.speed}m/s
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>no data</>
      )}
    </div>
  );
};

export default CardTodayWeather;
