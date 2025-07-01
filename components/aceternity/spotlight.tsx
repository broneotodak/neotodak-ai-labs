"use client";
import React from "react";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({ className, fill }: SpotlightProps) => {
  return (
    <svg
      className={`animate-pulse ${className}`}
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="spotlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={fill || "white"} stopOpacity="0.8" />
          <stop offset="50%" stopColor={fill || "white"} stopOpacity="0.4" />
          <stop offset="100%" stopColor={fill || "white"} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#spotlight)" />
    </svg>
  );
}; 