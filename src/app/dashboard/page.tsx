"use client";

import React, { useEffect, useState } from "react";
import CardTodayWeather from "@/app/dashboard/CardTodayWeather";
import { Search } from "lucide-react";
import { useGetForecastQuery, useGetWeatherQuery } from "@/state/api";
import CardGraphA from "@/app/dashboard/CardGraphA";
import CardForecast from "@/app/dashboard/CardForecast";
import CardHistory from "@/app/dashboard/CardHistory";
import { useAppDispatch, useAppSelector } from "../redux";
import { setHistory } from "@/state";
import CardGraphB from "./CardGraphB";
import { getCurrentDateTime } from "../utils/utils";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.global.history);
  const [search, setSearch] = useState(history[0]?.country || "");
  const [temp, setTemp] = useState(history[0]?.country || "");

  const {
    data: dataWeather,
    isLoading: isLoadingWeather,
    isError: isErrorWeather,
  } = useGetWeatherQuery(search);

  const {
    data: dataForecast,
    isLoading: isLoadingForecast,
    isError: isErrorForecast,
  } = useGetForecastQuery(search);

  const HandleSumit = (e: any) => {
    e.preventDefault();
    setSearch(temp);
    setTemp("");
  };

  useEffect(() => {
    if (dataWeather) {
      const currWeathers = [
        {
          country: dataWeather.name,
          sys: dataWeather.sys.country,
          dt: getCurrentDateTime(),
        },
        ...history,
      ];
      if (history.length < 1) {
        dispatch(setHistory(currWeathers));
      } else if (dataWeather.name !== history?.at(0).country) {
        dispatch(setHistory(currWeathers));
      }
    }
  }, [dataWeather]);

  return (
    <div className="flex flex-col">
      {/* Search Bar */}
      <div>
        <form onSubmit={HandleSumit}>
          <div className="flex flex-col pb-4">
            <div className="flex gap-4 py-2 items-center">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Start type to search"
                  onChange={(e) => {
                    setTemp(e.target.value);
                  }}
                  value={temp}
                  className="pl-10 pr-4 py-2 w-auto md:w-auto border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-50"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-500" size={20} />
                </div>
              </div>
              {/* Button */}
              <button
                className="bg-gray-200 px-4 py-2 rounded-md"
                type="submit"
              >
                Search
              </button>
            </div>
            {isErrorWeather || isErrorForecast ? (
              <span className="text-red-500 font-semibold pl-4">
                Invalid country or city
              </span>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-10 pb-4 custom-grid-rows">
        {/* Grid 1 */}

        <CardTodayWeather
          data={dataWeather}
          isLoading={isLoadingWeather}
          isError={isErrorWeather}
        />

        {/* Grid 2 */}

        <CardForecast
          data={dataForecast}
          isLoading={isLoadingForecast}
          isError={isErrorForecast}
        />

        {/* Grid 3 */}

        <CardGraphA
          data={dataForecast}
          isLoading={isLoadingForecast}
          isError={isErrorForecast}
        />

        {/* Grid 4 */}

        <CardGraphB
          data={dataForecast}
          isLoading={isLoadingForecast}
          isError={isErrorForecast}
        />

        {/* Grid 5 */}

        <CardHistory setSearch={setSearch} />
      </div>
    </div>
  );
};

export default Dashboard;
