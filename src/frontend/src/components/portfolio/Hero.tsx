import { motion } from "motion/react";

const floatingCards = [
  { label: "React", icon: "⚛️", color: "#22D3EE", delay: 0 },
  { label: "Python", icon: "🐍", color: "#8B5CF6", delay: 0.5 },
  { label: "Node.js", icon: "🟢", color: "#EC4899", delay: 1 },
];

export function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center pt-24 pb-16 px-4"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-3">
              Welcome to my portfolio
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Hi, I&apos;m <span className="gradient-text">Varnika S.L</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-[#A6B0C2] font-medium"
          >
            B.Tech IT Student | Aspiring Software Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-lg text-[#8B96AA] max-w-md leading-relaxed"
          >
            Building smart solutions with code and creativity
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={() => scrollTo("#projects")}
              className="gradient-btn text-white font-semibold px-8 py-3 rounded-full text-base"
            >
              View Projects
            </button>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              onClick={() => scrollTo("#contact")}
              className="glass neon-border text-[#F3F6FF] font-semibold px-8 py-3 rounded-full text-base hover:glow-cyan transition-all duration-300"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex gap-8 pt-4"
          >
            {[
              { num: "3+", label: "Projects" },
              { num: "1", label: "Patent Applied" },
              { num: "2024", label: "Batch" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-[#22D3EE]">{s.num}</div>
                <div className="text-xs text-[#8B96AA] mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Avatar + floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center"
        >
          <div className="relative">
            <div
              className="relative w-64 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden animate-glow-pulse"
              style={{
                border: "2px solid transparent",
                background:
                  "linear-gradient(rgba(12,18,34,0.8), rgba(12,18,34,0.8)) padding-box, linear-gradient(135deg, #22D3EE, #8B5CF6, #EC4899) border-box",
                boxShadow:
                  "0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(139,92,246,0.2)",
              }}
            >
              <img
                src="/assets/generated/varnika-avatar.dim_400x500.png"
                alt="Varnika S.L"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,7,18,0.6) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-lg">Varnika S.L</p>
                <p className="text-[#22D3EE] text-xs">
                  VIT Vellore · B.Tech IT
                </p>
              </div>
            </div>

            {/* Floating mini cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.label}
                className="absolute glass neon-border rounded-xl px-3 py-2 flex items-center gap-2 text-sm font-semibold"
                style={{
                  top: i === 0 ? "-16px" : i === 1 ? "40%" : undefined,
                  bottom: i === 2 ? "-16px" : undefined,
                  left: i === 1 ? "-60px" : undefined,
                  right: i === 0 ? "-24px" : i === 2 ? "-24px" : undefined,
                  color: card.color,
                  boxShadow: `0 0 15px ${card.color}44`,
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: card.delay,
                }}
              >
                <span className="text-base">{card.icon}</span>
                {card.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <span className="text-xs text-[#8B96AA] tracking-widest">SCROLL</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-[#22D3EE] to-transparent" />
      </motion.div>
    </section>
  );
}
