"use client";

import { motion } from "framer-motion";

export function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3 mb-16"
    >
      <span className="text-sm font-mono tracking-widest uppercase text-primary">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance text-center">
        {title}
      </h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-primary/40 mt-2"
      />
    </motion.div>
  );
}
