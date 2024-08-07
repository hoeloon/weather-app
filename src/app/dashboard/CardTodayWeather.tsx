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
  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }

  return (
    <div className="px-7">
      <h2 className="text-lg font-semibold mb-2 pt-5">Today Highlight</h2>
      <hr />
      {isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <div className="">
          <div className="flex justify-between items-center pb-4">
            <span className="text-5xl  p-4">
              {data.name}, {data.sys.country}{" "}
            </span>
            <div className="flex flex-col items-center">
              <Image
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="test"
                width={150}
                height={150}
              />
              <span className="capitalize font-bold">
                {data.weather[0].description}
              </span>
            </div>
          </div>
          <hr />
          <div className="flex justify-between p-4">
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
                <ArrowDownLeft className="w-5 h-5" />
                {data.wind.speed}m/s
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>"no data"</>
      )}
    </div>
  );
};

export default CardTodayWeather;
