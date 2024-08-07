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
  };

  useEffect(() => {
    if (dataWeather) {
      const ppp = [
        { country: dataWeather.name, sys: dataWeather.sys.country },
        ...history,
      ];
      dispatch(setHistory(ppp));
    }
  }, [dataWeather]);

  return (
    <div>
      {/* Search Bar */}
      <form onSubmit={HandleSumit}>
        <div className="flex gap-4 pb-5">
          <div className="relative">
            <input
              type="search"
              placeholder="Start type to search"
              onChange={(e) => {
                setTemp(e.target.value);
              }}
              className="pl-10 pr-4 py-2 w-auto md:w-auto border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-50"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-500" size={20} />
            </div>
          </div>
          {/* Button */}
          <button className="bg-gray-200 px-4 rounded-md" type="submit">
            Search
          </button>
        </div>
      </form>
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto md:overflow-auto gap-10 pb-4 custom-grid-rows">
        {/* Grid 1 */}
        <div
          className="row-span-3 col-span-2 xl:row-span-4 xl:col-span-1 md:row-span-2 md:col-span-1
      shadow-md rounded-2xl pb-16 bg-white bg-opacity-50"
        >
          <CardTodayWeather
            data={dataWeather}
            isLoading={isLoadingWeather}
            isError={isErrorWeather}
          />
        </div>
        {/* Grid 2 */}

        <CardForecast
          data={dataForecast}
          isLoading={isLoadingForecast}
          isError={isErrorForecast}
        />

        {/* Grid 3 */}
        <div
          className="row-span-3 col-span-2  xl:row-span-3 xl:col-span-1 md:row-span-2 md:col-span-1
      shadow-md rounded-2xl pb-16 bg-white"
        >
          <CardGraphA
            data={dataForecast}
            isLoading={isLoadingForecast}
            isError={isErrorForecast}
          />
        </div>
        {/* Grid 4 */}
        <div
          className="row-span-3 col-span-2  xl:row-span-4 xl:col-span-1 md:row-span-2 md:col-span-1
      shadow-md rounded-2xl flex flex-col justify-between bg-white"
        >
          <CardGraphB
            data={dataForecast}
            isLoading={isLoadingForecast}
            isError={isErrorForecast}
          />
        </div>
        {/* Grid 5 */}

        <CardHistory setSearch={setSearch} />
      </div>
    </div>
  );
};

export default Dashboard;
