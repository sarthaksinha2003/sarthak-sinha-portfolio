"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SectionHeader } from "./section-header";

const categories = [
  {
    title: "Languages",
    items: ["Java", "Python", "JavaScript", "SQL"],
  },
  {
    title: "Backend",
    items: ["Spring Boot", "Node.js", "REST APIs", "Microservices"],
  },
  {
    title: "Distributed Systems",
    items: ["Redis", "Load Balancing"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "Redis", "MySQL", "SQL Anywhere", "MongoDB"],
  },
  {
    title: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
  },
  {
    title: "Tools & Practices",
    items: ["Git", "System Design", "DSA", "Agile"],
  },
];

function SkillCard({ category, index }: { category: (typeof categories)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateX.set(((y - rect.height / 2) / rect.height) * -10);
    rotateY.set(((x - rect.width / 2) / rect.width) * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
      style={{ perspective: "600px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
        }}
        className="group rounded-xl border border-border bg-card p-5 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.06)] [transform-style:preserve-3d]"
      >
        <h3 className="text-sm font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
          {category.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {category.items.map((item, itemIdx) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + itemIdx * 0.04 + index * 0.05 }}
              whileHover={{
                scale: 1.08,
                backgroundColor: "rgba(59,130,246,0.15)",
                borderColor: "rgba(59,130,246,0.3)",
              }}
              className="px-2.5 py-1 rounded-md bg-secondary/60 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors cursor-default"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 bg-card/30">
      <div className="mx-auto max-w-4xl">
        <SectionHeader label="Toolkit" title="Skills & Technologies" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
