import { motion } from "motion/react";

const categories = [
  {
    label: "Languages",
    tags: ["English", "Tamil"],
  },
  {
    label: "Hobbies",
    tags: ["Reading", "Coding"],
  },
  {
    label: "Personal Info",
    tags: ["DOB: 14 Sep 2006", "Indian"],
  },
];

export function MoreAboutMe() {
  return (
    <section
      id="more-about-me"
      data-ocid="more_about_me.section"
      className="py-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <h2 className="text-xl font-semibold text-white whitespace-nowrap">
            ✨ More About Me
          </h2>
          <div className="flex-1 h-px bg-white/20" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6 flex flex-col items-center gap-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {cat.label}
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-sm text-white"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
