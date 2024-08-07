import React, { useEffect, useState } from "react";
import { Delete, Search, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setHistory } from "@/state";

type Props = {
  setSearch: any;
};

const CardHistory = ({ setSearch }: Props) => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.global.history);
  console.log("history", history);

  const handleDelete = (index: number) => {
    console.log("index", index);
    const reducedArr = [...history];
    reducedArr.splice(index, 1);
    dispatch(setHistory(reducedArr));
  };

  return (
    <div
      className="row-span-2 col-span-2  xl:row-span-3 xl:col-span-1 md:row-span-2 md:col-span-1
      shadow-md rounded-2xl flex flex-col justify-between bg-white"
    >
      <h2 className="text-lg font-semibold mb-2 px-5 pt-3">History</h2>
      <hr />
      <div className="overflow-auto h-full">
        {history &&
          history.map((item: any, index: number) => (
            <div className="flex flex-col gap-3 px-5 py-3 border-b" key={index}>
              <div className="flex gap-1 justify-between items-center">
                <span className="text-lg px-5">
                  {item.country}, {item.sys}
                </span>
                <span>
                  <div className="flex gap-3">
                    <button
                      className="bg-gray-200 p-3 rounded-full"
                      onClick={() => setSearch(item.country)}
                    >
                      <Search className="w-3 h-3" />
                    </button>
                    <button
                      className="bg-red-200 p-3 rounded-full"
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      <Trash className="w-3 h-3" />
                    </button>
                  </div>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardHistory;
