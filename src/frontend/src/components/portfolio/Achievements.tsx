import { motion } from "motion/react";

const achievements = [
  {
    icon: "🏆",
    title: "Innohack Hackathon",
    subtitle: "Participant",
    description:
      "Participated in Innohack, a competitive hackathon showcasing innovative solutions and collaborative problem-solving under time constraints.",
    color: "#22D3EE",
    glow: "rgba(34,211,238,0.25)",
  },
  {
    icon: "📜",
    title: "Patent Applied",
    subtitle: "Ransomware Detection System",
    description:
      "Applied for a patent on a behavior-based ransomware detection system — a milestone achievement highlighting innovation and intellectual contribution.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
  },
];

export function Achievements() {
  return (
    <section
      id="achievements"
      data-ocid="achievements.section"
      className="py-24 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-3">
            Recognition
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Achievements
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              data-ocid={`achievements.item.${i + 1}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-60px" }}
              className="glass-strong rounded-3xl p-7 flex gap-5 items-start group"
              style={{
                border: `1px solid ${a.color}44`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 0 ${a.glow}`,
                transition: "all 0.3s ease",
              }}
              whileHover={{
                boxShadow: `0 12px 40px ${a.glow}, 0 0 0 1px ${a.color}44`,
                y: -4,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{
                  background: `${a.color}20`,
                  boxShadow: `0 0 20px ${a.color}44`,
                }}
              >
                {a.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{a.title}</h3>
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: a.color }}
                >
                  {a.subtitle}
                </p>
                <p className="text-[#8B96AA] text-sm leading-relaxed">
                  {a.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
