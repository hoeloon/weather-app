"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkmode } from "@/state";
import { useGetWeatherQuery } from "@/state/api";
import { Moon, Search, Sun } from "lucide-react";
import React, { useState } from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleDarkMode = () => {
    dispatch(setIsDarkmode(!isDarkMode));
  };
  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <span className="font-extrabold text-2xl">Weather App</span>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-10" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-10" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
