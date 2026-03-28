import { Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer data-ocid="footer.panel" className="py-10 px-4 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-white/10 mb-8" />
        <div className="flex flex-col items-center gap-3 text-center">
          <p
            className="text-sm italic max-w-xl"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            I hereby declare that the information given is true and correct to
            the best of my knowledge.
          </p>
          <p
            className="text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            — Varnika S.L · Vellore, India
          </p>
          <p
            className="text-xs mt-4"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            © {year} ·{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              Built with{" "}
              <Heart
                size={10}
                className="inline"
                style={{ color: "#EC4899" }}
              />{" "}
              using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
