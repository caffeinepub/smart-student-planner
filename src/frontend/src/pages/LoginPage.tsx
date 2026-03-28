import { BookOpen, Cake, CheckSquare, Code2 } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const features = [
  {
    id: "tasks",
    icon: <CheckSquare size={18} />,
    text: "Task & Todo Management",
  },
  { id: "reading", icon: <BookOpen size={18} />, text: "Reading Tracker" },
  { id: "coding", icon: <Code2 size={18} />, text: "Coding Progress" },
  { id: "birthdays", icon: <Cake size={18} />, text: "Birthday Reminders" },
];

export default function LoginPage() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(28,33,64,0.9), rgba(20,24,44,0.95))",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 32px 64px rgba(0,0,0,0.5), 0 0 40px rgba(155,108,255,0.15)",
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
            style={{
              background: "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
              boxShadow: "0 0 40px rgba(155,108,255,0.5)",
            }}
          >
            SSP
          </motion.div>

          <h1 className="text-3xl font-black text-white mb-1 tracking-wider">
            SMART STUDENT
          </h1>
          <p className="text-cyan-400 text-sm mb-6 tracking-widest">PLANNER</p>

          <p className="text-gray-400 text-sm mb-8">
            Your all-in-one futuristic productivity suite for academic
            excellence
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {features.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2 p-3 rounded-xl text-left"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span style={{ color: "#9B6CFF" }}>{f.icon}</span>
                <span className="text-gray-300 text-xs">{f.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Login button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={login}
            disabled={isLoggingIn}
            className="w-full py-4 rounded-xl text-white font-bold text-sm tracking-wider transition-all"
            style={{
              background: isLoggingIn
                ? "rgba(155,108,255,0.4)"
                : "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
              boxShadow: isLoggingIn
                ? "none"
                : "0 0 30px rgba(155,108,255,0.4)",
            }}
          >
            {isLoggingIn ? "CONNECTING..." : "LOGIN WITH INTERNET IDENTITY"}
          </motion.button>

          <p className="text-gray-600 text-xs mt-4">
            Secured by Internet Computer Protocol
          </p>
        </motion.div>
      </div>
    </div>
  );
}
