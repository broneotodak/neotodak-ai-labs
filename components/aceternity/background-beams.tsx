"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(circle_at_center,white,transparent)]",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip)">
          <g opacity="0.5">
            <motion.path
              d="M-400 0L-200 200L0 0L200 200L400 0"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            />
            <motion.path
              d="M-400 100L-200 300L0 100L200 300L400 100"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: 0.5,
              }}
            />
          </g>
        </g>
        <defs>
          <linearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <clipPath id="clip">
            <rect width="400" height="400" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}; 