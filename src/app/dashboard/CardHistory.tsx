import { Search, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setHistory } from "@/state";
import Title from "../(components)/Title";
import { timeAgo } from "../utils/utils";

type Props = {
  setSearch: any;
};

const CardHistory = ({ setSearch }: Props) => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.global.history);

  const handleDelete = (index: number) => {
    const reducedArr = [...history];
    reducedArr.splice(index, 1);
    dispatch(setHistory(reducedArr));
  };

  return (
    <div
      className="row-span-2 col-span-2  xl:row-span-3 xl:col-span-1 md:row-span-2 md:col-span-1
      shadow-md rounded-2xl flex flex-col justify-between bg-white bg-opacity-50"
    >
      <Title title="History" />
      <hr />
      <div className="overflow-auto h-full  scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin scrollbar-track-transparent">
        {history &&
          history.map((item: any, index: number) => (
            <div className="flex flex-col gap-3 px-5 py-3 border-b" key={index}>
              <div className="flex gap-1 justify-between items-center">
                <span className="text-lg px-5">
                  {item.country}, {item.sys}
                </span>
                <div className="flex gap-3 items-center">
                  <span>{timeAgo(item.dt)}</span>
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
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardHistory;
