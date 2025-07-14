"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export const ParallaxCard: React.FC<ParallaxCardProps> = ({
  children,
  className = "",
  offset = 50
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
}; 