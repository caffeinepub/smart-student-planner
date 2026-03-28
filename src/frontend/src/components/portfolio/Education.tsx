import { motion } from "motion/react";

const timeline = [
  {
    year: "2024–2028",
    title: "B.Tech Information Technology",
    institution: "VIT Vellore",
    detail:
      "Pursuing undergraduate degree with focus on software development and emerging technologies.",
    color: "#22D3EE",
    icon: "🎓",
  },
  {
    year: "2024",
    title: "Class XII",
    institution: "Higher Secondary Education",
    detail:
      "Scored 89% in Class XII with strong foundation in Mathematics and Computer Science.",
    color: "#8B5CF6",
    icon: "📚",
  },
  {
    year: "2022",
    title: "Class X",
    institution: "Secondary Education",
    detail:
      "Scored 88% in Class X, demonstrating consistent academic excellence.",
    color: "#EC4899",
    icon: "🏫",
  },
];

export function Education() {
  return (
    <section
      id="education"
      data-ocid="education.section"
      className="py-24 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-3">
            My Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Education
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5"
            style={{
              background:
                "linear-gradient(to bottom, #22D3EE, #8B5CF6, #EC4899)",
            }}
          />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                data-ocid={`education.item.${i + 1}`}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true, margin: "-60px" }}
                className="relative pl-16"
              >
                {/* Node */}
                <div
                  className="absolute left-3 top-4 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  style={{
                    background: item.color,
                    boxShadow: `0 0 16px ${item.color}88`,
                    zIndex: 1,
                  }}
                >
                  <span>{item.icon}</span>
                </div>

                <div
                  className="glass-strong rounded-2xl p-5"
                  style={{ border: `1px solid ${item.color}33` }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-white font-bold text-base">
                        {item.title}
                      </h3>
                      <p
                        className="text-sm font-medium"
                        style={{ color: item.color }}
                      >
                        {item.institution}
                      </p>
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: `${item.color}20`,
                        color: item.color,
                        border: `1px solid ${item.color}44`,
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <p className="text-[#8B96AA] text-sm leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
