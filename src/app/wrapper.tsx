"use client";

import React, { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar";

import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });
  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-100 text-gray-900 w-full min-h-screen `}
    >
      <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-100`}>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default Wrapper;
