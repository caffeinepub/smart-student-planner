import { motion } from "motion/react";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className = "",
  glowColor = "#9B6CFF",
  onClick,
  hover = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      onClick={onClick}
      className={`relative rounded-2xl p-5 cursor-pointer ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(28,33,64,0.85) 0%, rgba(20,24,44,0.9) 100%)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04), 0 0 20px ${glowColor}22`,
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Top highlight */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
      />
      {children}
    </motion.div>
  );
}
