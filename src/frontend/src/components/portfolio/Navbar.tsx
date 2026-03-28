import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-ocid="nav.panel"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full max-w-5xl rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "glass-strong shadow-glass" : "glass"
        }`}
      >
        {/* Brand */}
        <button
          type="button"
          data-ocid="nav.link"
          onClick={() => scrollTo("#hero")}
          className="text-lg font-bold gradient-text tracking-tight"
        >
          Varnika S.L
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              data-ocid="nav.link"
              onClick={() => scrollTo(link.href)}
              className="text-sm text-[#A6B0C2] hover:text-[#22D3EE] transition-colors duration-200 font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          data-ocid="nav.toggle"
          className="md:hidden text-[#22D3EE]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-4 right-4 glass-strong rounded-2xl p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                data-ocid="nav.link"
                onClick={() => scrollTo(link.href)}
                className="text-left text-base text-[#A6B0C2] hover:text-[#22D3EE] transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
