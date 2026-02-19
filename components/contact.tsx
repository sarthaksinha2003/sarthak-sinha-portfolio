"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./section-header";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "sarthak@example.com",
    href: "mailto:sarthak@example.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/sarthaksinha",
    href: "#",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/sarthaksinha",
    href: "#",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-card/30">
      <div className="mx-auto max-w-4xl">
        <SectionHeader label="Connect" title="Get in Touch" />

        <motion.p
          initial={{ opacity: 0, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-muted-foreground mb-12 max-w-md mx-auto text-pretty leading-relaxed"
        >
          Always interested in discussing distributed systems, backend
          architecture, or new opportunities. Let{"'"}s connect.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.label !== "Email" ? "_blank" : undefined}
              rel={contact.label !== "Email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500 relative overflow-hidden"
            >
              {/* Shine sweep */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-primary/5 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              <motion.div
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative z-10 p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
              >
                <contact.icon size={20} />
              </motion.div>
              <span className="relative z-10 text-sm font-medium text-foreground">
                {contact.label}
              </span>
              <span className="relative z-10 text-xs text-muted-foreground flex items-center gap-1">
                {contact.value}
                <ArrowUpRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
