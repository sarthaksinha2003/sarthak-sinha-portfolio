"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Github, Zap, Globe, Shield, BarChart3 } from "lucide-react";
import { SectionHeader } from "./section-header";

const projects = [
  {
    title: "Idempotent Request Processing Service",
    description:
      "High-throughput distributed service ensuring exactly-once semantics for API requests. Built with Java and Spring Boot, featuring Redis-backed idempotency keys, exponential backoff retry logic, and comprehensive request deduplication.",
    tech: ["Java", "Spring Boot", "Redis", "Kafka", "Docker"],
    stats: [
      { icon: Zap, label: "Throughput", value: "10K+ RPS" },
      { icon: Shield, label: "Reliability", value: "99.99%" },
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "URL Redirection Traffic Control",
    description:
      "Scalable URL shortening and traffic management system with real-time analytics, geographic routing, and A/B testing capabilities. Handles millions of redirects with sub-millisecond latency using an in-memory cache layer.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "AWS"],
    stats: [
      { icon: Globe, label: "Latency", value: "<1ms" },
      { icon: BarChart3, label: "Scale", value: "1M+ URLs" },
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springGlowX = useSpring(glowX, { stiffness: 300, damping: 30 });
  const springGlowY = useSpring(glowY, { stiffness: 300, damping: 30 });
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
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
      initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "600px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-xl border border-border bg-card p-6 md:p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)] overflow-hidden"
      >
        {/* Mouse-following spotlight */}
        <motion.div
          className="absolute w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            left: springGlowX,
            top: springGlowY,
            x: "-50%",
            y: "-50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)",
          }}
        />

        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              {[
                { href: project.githubUrl, icon: Github, ariaLabel: `GitHub repository for ${project.title}` },
                { href: project.liveUrl, icon: ExternalLink, ariaLabel: `Live demo for ${project.title}` },
              ].map(({ href, icon: Icon, ariaLabel }) => (
                <motion.a
                  key={ariaLabel}
                  href={href}
                  aria-label={ariaLabel}
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Stats with staggered reveal */}
          <div className="flex flex-wrap gap-3">
            {project.stats.map((stat, si) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + si * 0.1 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border"
              >
                <stat.icon size={14} className="text-primary" />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <span className="text-xs font-bold text-foreground">{stat.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Tech stack with staggered entrance */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            {project.tech.map((t, ti) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + ti * 0.06 }}
                className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader label="Work" title="Featured Projects" />
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
