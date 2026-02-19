"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { SectionHeader } from "./section-header";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

const experiences = [
  {
    role: "Software Development Engineer Intern",
    company: "Meditab Software",
    period: "May 2024 - Aug 2024",
    location: "India",
    type: "Internship",
    bullets: [
      "Designed and implemented RESTful APIs handling 50K+ daily requests with Spring Boot",
      "Optimized database queries reducing response latency by 40%",
      "Built automated CI/CD pipelines streamlining deployment workflows",
    ],
    tech: ["Spring Boot", "REST APIs", "PostgreSQL", "CI/CD", "Docker"],
    highlight: "50K+ daily API requests",
  },
  {
    role: "Backend Engineer Intern",
    company: "Coding Blocks",
    period: "Jan 2024 - Apr 2024",
    location: "India",
    type: "Internship",
    bullets: [
      "Developed scalable backend services for ed-tech platform serving 100K+ users",
      "Implemented caching strategies with Redis reducing database load by 60%",
      "Contributed to microservices migration improving system reliability",
    ],
    tech: ["Node.js", "Redis", "Microservices", "MongoDB", "AWS"],
    highlight: "100K+ users served",
  },
];

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative flex items-start gap-6 md:gap-10 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col`}
    >
      {/* Timeline connector arm - desktop only */}
      <div
        className={`hidden md:block absolute top-8 ${
          isLeft ? "left-1/2 ml-3" : "right-1/2 mr-3"
        } h-px w-8 bg-border`}
      >
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
        />
      </div>

      {/* Card */}
      <div
        className={`w-full md:w-[calc(50%-2rem)] text-left`}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative group rounded-xl overflow-hidden"
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute -inset-px rounded-xl z-0"
            style={{
              background: hovered
                ? `radial-gradient(600px circle at ${springX.get() * 100}% ${springY.get() * 100}%, rgba(59,130,246,0.25), transparent 60%)`
                : "none",
            }}
            animate={{
              background: hovered
                ? `radial-gradient(600px circle at 50% 50%, rgba(59,130,246,0.25), transparent 60%)`
                : "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 50%, rgba(59,130,246,0.05) 100%)",
            }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative z-10 bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 group-hover:border-primary/20 transition-colors duration-500">
            {/* Top row: badge + period */}
            <div
              className="flex items-center gap-3 mb-4"
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                <Briefcase className="w-3 h-3" />
                {exp.type}
              </span>
              <div
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <Calendar className="w-3 h-3" />
                <span className="font-mono">{exp.period}</span>
              </div>
            </div>

            {/* Highlight stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
              className="mb-4"
            >
              <span className="inline-block px-3 py-1 rounded-md bg-primary/5 border border-primary/10 text-xs font-mono text-primary">
                {exp.highlight}
              </span>
            </motion.div>

            {/* Title */}
            <h3
              className="text-lg font-bold text-foreground mb-1"
            >
              {exp.role}
            </h3>
            <div
              className="flex items-center gap-2 mb-4 text-sm text-muted-foreground"
            >
              <span className="font-medium text-secondary-foreground">
                {exp.company}
              </span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {exp.location}
              </span>
            </div>

            {/* Bullets */}
            <ul
              className="flex flex-col gap-2.5 mb-5"
            >
              {exp.bullets.map((bullet, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + j * 0.1 + index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>

            {/* Tech tags */}
            <div
              className="flex flex-wrap gap-2"
            >
              {exp.tech.map((tag, j) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.5 + j * 0.06 + index * 0.15,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(59,130,246,0.15)",
                  }}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-secondary text-secondary-foreground border border-border/50 cursor-default transition-colors duration-200"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Bottom shine sweep on hover */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px"
              animate={{
                background: hovered
                  ? "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)"
                  : "linear-gradient(90deg, transparent, transparent, transparent)",
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 md:py-32 px-6 relative">
      {/* Subtle radial background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl relative">
        <SectionHeader label="Career" title="Experience" />

        <div ref={containerRef} className="relative">
          {/* Center timeline - desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />

          {/* Animated glow line - desktop */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px bg-primary"
            style={{
              height: lineHeight,
              boxShadow:
                "0 0 8px rgba(59,130,246,0.5), 0 0 24px rgba(59,130,246,0.2)",
            }}
          />

          {/* Mobile left timeline */}
          <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-border" />
          <motion.div
            className="md:hidden absolute left-3 top-0 w-px bg-primary"
            style={{
              height: lineHeight,
              boxShadow:
                "0 0 8px rgba(59,130,246,0.5), 0 0 24px rgba(59,130,246,0.2)",
            }}
          />

          {/* Timeline nodes and cards */}
          <div className="flex flex-col gap-16 md:gap-20 pl-10 md:pl-0">
            {experiences.map((exp, i) => (
              <div key={exp.company} className="relative">
                {/* Timeline dot - desktop center */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-10 items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      delay: i * 0.15,
                    }}
                    className="relative"
                  >
                    <div className="w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
                    <motion.div
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.4, 0, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      className="absolute inset-0 rounded-full bg-primary/40"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 3, 1],
                        opacity: [0.2, 0, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5 + 0.3,
                      }}
                      className="absolute inset-0 rounded-full bg-primary/20"
                    />
                  </motion.div>
                </div>

                {/* Timeline dot - mobile left */}
                <div className="md:hidden absolute -left-10 top-8 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      delay: i * 0.15,
                    }}
                    className="relative"
                  >
                    <div className="w-3 h-3 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <motion.div
                      animate={{
                        scale: [1, 2.5, 1],
                        opacity: [0.4, 0, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      className="absolute inset-0 rounded-full bg-primary/30"
                    />
                  </motion.div>
                </div>

                <ExperienceCard exp={exp} index={i} />
              </div>
            ))}
          </div>

          {/* End cap */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-4 w-2 h-2 rounded-full bg-primary/40 items-center justify-center"
          >
            <div className="w-1 h-1 rounded-full bg-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
