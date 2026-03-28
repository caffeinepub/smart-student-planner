import { motion } from "motion/react";

const skillGroups = [
  {
    category: "Programming",
    color: "#22D3EE",
    skills: [
      { name: "Java", icon: "☕" },
      { name: "Python", icon: "🐍" },
      { name: "C", icon: "⚡" },
      { name: "C++", icon: "🔷" },
    ],
  },
  {
    category: "Web",
    color: "#8B5CF6",
    skills: [
      { name: "HTML", icon: "🌐" },
      { name: "CSS", icon: "🎨" },
      { name: "JavaScript", icon: "🟡" },
      { name: "Bootstrap", icon: "💜" },
    ],
  },
  {
    category: "Frontend",
    color: "#EC4899",
    skills: [{ name: "React JS", icon: "⚛️" }],
  },
  {
    category: "Backend",
    color: "#22D3EE",
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚀" },
    ],
  },
  {
    category: "Database",
    color: "#8B5CF6",
    skills: [
      { name: "MongoDB", icon: "🍃" },
      { name: "SQL", icon: "🗄️" },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" data-ocid="skills.section" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-3">
            What I Know
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Skills & Technologies
          </h2>
        </motion.div>

        <div className="space-y-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: group.color,
                    boxShadow: `0 0 8px ${group.color}`,
                  }}
                />
                <p
                  className="text-sm font-semibold tracking-wider uppercase"
                  style={{ color: group.color }}
                >
                  {group.category}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: gi * 0.1 + si * 0.07 }}
                    viewport={{ once: true }}
                    className="tilt-card glass rounded-2xl px-5 py-4 flex flex-col items-center gap-2 min-w-[80px] cursor-default"
                    style={{
                      border: `1px solid ${group.color}33`,
                    }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-xs font-semibold text-[#F3F6FF] text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
