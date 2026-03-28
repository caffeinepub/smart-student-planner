import { Brain, Code2, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const traits = [
  {
    icon: Code2,
    label: "Software Developer",
    desc: "Passionate about clean, efficient code",
  },
  {
    icon: Brain,
    label: "Problem Solver",
    desc: "Analytical and creative thinker",
  },
  {
    icon: Users,
    label: "Team Player",
    desc: "Collaborative and communicative",
  },
  { icon: Zap, label: "Quick Learner", desc: "Adaptable to new technologies" },
];

export function About() {
  return (
    <section id="about" data-ocid="about.section" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-3">
            Who I Am
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            About Me
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="glass-strong neon-border rounded-3xl p-8 md:p-12 shadow-glass"
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-2xl"
                  style={{ boxShadow: "0 0 20px rgba(34,211,238,0.3)" }}
                >
                  🎓
                </div>
                <div>
                  <p className="font-bold text-white text-lg">VIT Vellore</p>
                  <p className="text-[#22D3EE] text-sm">
                    B.Tech Information Technology · 2024–2028
                  </p>
                </div>
              </div>
              <p className="text-[#A6B0C2] leading-relaxed text-base">
                I&apos;m a second-year B.Tech IT student at VIT Vellore with a
                deep passion for software development and building impactful
                digital solutions. I thrive on turning complex problems into
                elegant code.
              </p>
              <p className="text-[#A6B0C2] leading-relaxed text-base">
                From developing a patent-applied ransomware detection system to
                building full-stack web applications, I bring dedication and
                creativity to every project I undertake.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Java", "Python", "React", "Node.js", "MongoDB"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="glass text-[#22D3EE] text-xs font-semibold px-3 py-1 rounded-full border border-[#22D3EE33]"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {traits.map((trait, i) => (
                <motion.div
                  key={trait.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-4 text-center hover:glow-cyan transition-all duration-300 cursor-default"
                >
                  <trait.icon
                    size={24}
                    className="mx-auto mb-2 text-[#22D3EE]"
                  />
                  <p className="text-white font-semibold text-sm">
                    {trait.label}
                  </p>
                  <p className="text-[#8B96AA] text-xs mt-1">{trait.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
