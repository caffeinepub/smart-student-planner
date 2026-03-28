import { motion } from "motion/react";

const learningItems = [
  { label: "React Advanced Concepts", pct: 60, color: "#22D3EE", icon: "⚛️" },
  { label: "Full Stack Development", pct: 45, color: "#8B5CF6", icon: "🚀" },
  {
    label: "Data Structures & Algorithms",
    pct: 70,
    color: "#EC4899",
    icon: "🧠",
  },
];

export function CurrentlyLearning() {
  return (
    <section id="learning" data-ocid="learning.section" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-3">
            In Progress
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Currently Learning
          </h2>
        </motion.div>

        <div className="space-y-6">
          {learningItems.map((item, i) => (
            <motion.div
              key={item.label}
              data-ocid={`learning.item.${i + 1}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-60px" }}
              className="glass-strong rounded-2xl p-6"
              style={{ border: `1px solid ${item.color}33` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-white font-semibold">{item.label}</span>
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ color: item.color }}
                >
                  {item.pct}%
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="h-2.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                    boxShadow: `0 0 10px ${item.color}66`,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.15 + 0.3,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
