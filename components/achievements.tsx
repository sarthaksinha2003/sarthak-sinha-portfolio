"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Code, TrendingUp } from "lucide-react";
import { SectionHeader } from "./section-header";

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

const achievements = [
  {
    icon: Trophy,
    value: 1.1,
    suffix: "%",
    prefix: "Top ",
    label: "LeetCode Global Ranking",
    description: "Ranked among the top 1.1% of competitive programmers worldwide",
    isDecimal: true,
  },
  {
    icon: Code,
    value: 600,
    suffix: "+",
    prefix: "",
    label: "Problems Solved",
    description: "Across LeetCode, Codeforces, and other competitive platforms",
    isDecimal: false,
  },
  {
    icon: TrendingUp,
    value: 1519,
    suffix: "+",
    prefix: "",
    label: "Peak Rating",
    description: "Contest rating demonstrating consistent algorithmic excellence",
    isDecimal: false,
  },
];

function AchievementCard({
  achievement,
  index,
}: {
  achievement: (typeof achievements)[0];
  index: number;
}) {
  const { count, ref } = useCountUp(
    achievement.isDecimal ? 11 : achievement.value,
    achievement.isDecimal ? 1500 : 2000
  );

  const displayValue = achievement.isDecimal
    ? (count / 10).toFixed(1)
    : count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        className="group text-center flex flex-col items-center gap-4 p-6 md:p-8 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] transition-all duration-500 relative overflow-hidden"
      >
        {/* Background pulse on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="relative z-10 p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
        >
          <achievement.icon size={24} />
        </motion.div>
        <motion.div
          className="relative z-10 text-3xl md:text-4xl font-bold text-foreground font-mono"
          initial={{ scale: 1 }}
        >
          {achievement.prefix}
          {displayValue}
          {achievement.suffix}
        </motion.div>
        <div className="relative z-10 text-sm font-medium text-foreground">
          {achievement.label}
        </div>
        <p className="relative z-10 text-xs text-muted-foreground leading-relaxed">
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader label="Competitive" title="Achievements" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <AchievementCard key={a.label} achievement={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
