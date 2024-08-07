import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowUpLeft,
  ArrowDownRight,
} from "lucide-react";

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
