"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "./section-header";

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-card/30 overflow-hidden"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeader label="About" title="Who I Am" />

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Profile picture with animated border glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: imageY, rotate: imageRotate }}
            className="relative shrink-0 group"
          >
            {/* Rotating glow ring */}
            <div className="absolute -inset-3 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700">
              <div
                className="absolute inset-0 rounded-full animate-spin"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, #3b82f6, transparent, #3b82f6, transparent)",
                  animationDuration: "6s",
                }}
              />
            </div>

            {/* Inner mask */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-border bg-background">
              <Image
                src="/images/my_pictures.jpg"
                alt="Sarthak Sinha - Software Engineer"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating status badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-foreground">Available</span>
            </motion.div>
          </motion.div>

          {/* Bio text with staggered reveal */}
          <div className="flex flex-col gap-5 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground leading-relaxed text-pretty"
            >
              I{"'"}m a Software Engineer passionate about building distributed systems
              and backend infrastructure that operates at scale. I love tackling complex
              problems in fault tolerance, consistency, and high-throughput data processing.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground leading-relaxed text-pretty"
            >
              With experience across Spring Boot, Redis, Kafka, and cloud-native
              architectures, I focus on writing clean, efficient code that solves
              real-world engineering challenges. When I{"'"}m not building systems, you{"'"}ll
              find me competing on LeetCode or exploring new distributed computing papers.
            </motion.p>

            {/* Quick stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center md:justify-start gap-6 mt-2"
            >
              {[
                { label: "Experience", value: "0.5 Year" },
                { label: "Problems Solved", value: "600+" },
                { label: "Systems Built", value: "10+" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold font-mono text-primary">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
