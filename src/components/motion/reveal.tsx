
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  hover = false,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -7 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
