import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Coord {
  lon: number;
  lat: number;
}
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}
export interface Wind {
  speed: number;
  deg: number;
}
export interface Clouds {
  all: number;
}
export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
export interface CurrentWeather {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Temp {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
export interface ForeCastWeather {
  cod: string;
  message: number;
  cnt: number;
  list: Temp[];
  city: City;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org" }),
  reducerPath: "api",
  tagTypes: ["Weather"],
  endpoints: (build) => ({
    getWeather: build.query<CurrentWeather, string | void>({
      query: (q) => ({
        url: "/data/2.5/weather",
        params: {
          q: q || "singapore",
          units: "metric",
          appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY,
        },
      }),
    }),
    getForecast: build.query<ForeCastWeather, string | void>({
      query: (q) => ({
        url: "/data/2.5/forecast",
        params: {
          q: q || "singapore",
          units: "metric",
          appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY,
        },
      }),
    }),
  }),
});

export const { useGetWeatherQuery, useGetForecastQuery } = api;
