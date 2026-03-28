import { Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { SiGithub, SiLinkedin } from "react-icons/si";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-3">
            Let&apos;s Connect
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Get In Touch
          </h2>
          <p className="text-[#8B96AA] mt-4 max-w-lg mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="glass-strong neon-border rounded-3xl p-8 space-y-6"
        >
          <h3 className="text-white font-bold text-xl">Contact Info</h3>

          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center glow-cyan flex-shrink-0"
              style={{ background: "rgba(34,211,238,0.15)" }}
            >
              <Mail size={20} className="text-[#22D3EE]" />
            </div>
            <div>
              <p className="text-xs text-[#8B96AA] mb-0.5">Email</p>
              <a
                href="mailto:varnika1204@gmail.com"
                className="text-white font-medium hover:text-[#22D3EE] transition-colors"
              >
                varnika1204@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center glow-purple flex-shrink-0"
              style={{ background: "rgba(139,92,246,0.15)" }}
            >
              <Phone size={20} className="text-[#8B5CF6]" />
            </div>
            <div>
              <p className="text-xs text-[#8B96AA] mb-0.5">Phone</p>
              <a
                href="tel:+918637435935"
                className="text-white font-medium hover:text-[#8B5CF6] transition-colors"
              >
                +91-8637435935
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-[#8B96AA] mb-3">Find me on</p>
            <div className="flex gap-3">
              {[
                {
                  Icon: SiGithub,
                  href: "https://github.com",
                  color: "#22D3EE",
                  label: "GitHub",
                },
                {
                  Icon: SiLinkedin,
                  href: "https://linkedin.com",
                  color: "#8B5CF6",
                  label: "LinkedIn",
                },
              ].map(({ Icon, href, color, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ border: `1px solid ${color}33` }}
                >
                  <Icon size={16} style={{ color }} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
