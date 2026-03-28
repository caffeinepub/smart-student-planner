import { motion } from "motion/react";

const projects = [
  {
    title: "Ransomware Detection System",
    badge: "Patent Applied",
    badgeColor: "#F59E0B",
    description:
      "A behavior-based detection system that monitors file system activity and suspicious processes in real-time to detect and prevent ransomware attacks before they cause damage.",
    tech: [
      "Python",
      "Machine Learning",
      "File System API",
      "Behavioral Analysis",
    ],
    icon: "🛡️",
    glow: "rgba(245,158,11,0.3)",
    border: "#F59E0B",
  },
  {
    title: "Watch E-Commerce Website",
    badge: null,
    badgeColor: "",
    description:
      "A fully-featured e-commerce platform for luxury watches featuring product listings with high-quality images, pricing, and a clean shopping experience.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    icon: "⌚",
    glow: "rgba(34,211,238,0.25)",
    border: "#22D3EE",
  },
  {
    title: "Plastic Reduction Web App",
    badge: null,
    badgeColor: "",
    description:
      "An eco-conscious web application that tracks individual plastic usage patterns and generates personalized reduction strategies to help users live more sustainably.",
    tech: ["React", "Node.js", "MongoDB", "Data Visualization"],
    icon: "🌿",
    glow: "rgba(139,92,246,0.25)",
    border: "#8B5CF6",
  },
];

export function Projects() {
  return (
    <section id="projects" data-ocid="projects.section" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-3">
            My Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              data-ocid={`projects.item.${i + 1}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-60px" }}
              className="glass-strong rounded-3xl overflow-hidden flex flex-col group cursor-default"
              style={{
                border: `1px solid ${project.border}33`,
                transition: "all 0.3s ease",
              }}
              whileHover={{
                y: -10,
                boxShadow: `0 20px 60px ${project.glow}, 0 10px 30px rgba(0,0,0,0.5)`,
              }}
            >
              {/* Preview Area */}
              <div
                className="h-44 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `radial-gradient(ellipse at center, ${project.glow} 0%, rgba(12,18,34,0.8) 70%)`,
                  borderBottom: `1px solid ${project.border}33`,
                }}
              >
                <span className="text-6xl">{project.icon}</span>
                {project.badge && (
                  <span
                    className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${project.badgeColor}33, ${project.badgeColor}55)`,
                      border: `1px solid ${project.badgeColor}`,
                      color: project.badgeColor,
                      boxShadow: `0 0 12px ${project.badgeColor}66`,
                    }}
                  >
                    ⭐ {project.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <h3 className="text-lg font-bold text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-[#8B96AA] text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium px-2 py-1 rounded-lg"
                      style={{
                        background: `${project.border}15`,
                        color: project.border,
                        border: `1px solid ${project.border}33`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
