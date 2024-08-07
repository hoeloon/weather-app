import { setHistory } from "@/state";
import { useAppDispatch, useAppSelector } from "../redux";

export const lastHistoryCountryName = () => {
  return "singapore";
};

export function epochToDate(epoch: number): string {
  // Create a new Date object using the epoch value
  const date = new Date(epoch * 1000);

  // Format the date to a readable string
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  return formattedDate;
}