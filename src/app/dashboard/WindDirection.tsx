import React from "react";
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

// Function to get the direction and angle
const getDirectionAndAngle = (wind: { speed: number; deg: number }) => {
  const { deg } = wind;

  let direction = "";
  let IconComponent;

  if ((deg >= 0 && deg < 22.5) || (deg >= 337.5 && deg < 360)) {
    direction = "North";
    IconComponent = ArrowUp;
  } else if (deg >= 22.5 && deg < 67.5) {
    direction = "North-East";
    IconComponent = ArrowUpRight;
  } else if (deg >= 67.5 && deg < 112.5) {
    direction = "East";
    IconComponent = ArrowRight;
  } else if (deg >= 112.5 && deg < 157.5) {
    direction = "South-East";
    IconComponent = ArrowDownRight;
  } else if (deg >= 157.5 && deg < 202.5) {
    direction = "South";
    IconComponent = ArrowDown;
  } else if (deg >= 202.5 && deg < 247.5) {
    direction = "South-West";
    IconComponent = ArrowDownLeft;
  } else if (deg >= 247.5 && deg < 292.5) {
    direction = "West";
    IconComponent = ArrowLeft;
  } else if (deg >= 292.5 && deg < 337.5) {
    direction = "North-West";
    IconComponent = ArrowUpLeft;
  } else {
    direction = "Unknown";
    IconComponent = ArrowUp;
  }

  return { direction, IconComponent };
};

// React component to display the wind direction and angle
const WindDirection = ({ wind }: { wind: { speed: number; deg: number } }) => {
  const { direction, IconComponent } = getDirectionAndAngle(wind);

  return <IconComponent className="w-5 h-5" />;
};
export default WindDirection;
