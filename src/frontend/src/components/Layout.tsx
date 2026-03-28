import {
  Bell,
  BookOpen,
  Cake,
  CalendarDays,
  CheckSquare,
  Clock,
  Code2,
  Flame,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { Page } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
  { id: "timetable", label: "Timetable", icon: <Clock size={16} /> },
  { id: "tasks", label: "Tasks", icon: <CheckSquare size={16} /> },
  { id: "reading", label: "Reading", icon: <BookOpen size={16} /> },
  { id: "coding", label: "Coding", icon: <Code2 size={16} /> },
  { id: "calendar", label: "Calendar", icon: <CalendarDays size={16} /> },
  { id: "birthdays", label: "Birthdays", icon: <Cake size={16} /> },
  { id: "habits", label: "Habits", icon: <Flame size={16} /> },
];

interface LayoutProps {
  children: ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userName: string;
}

export default function Layout({
  children,
  currentPage,
  onNavigate,
  userName,
}: LayoutProps) {
  const { clear } = useInternetIdentity();

  return (
    <div
      className="relative min-h-screen"
      style={{ position: "relative", zIndex: 2 }}
    >
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 px-6 py-3"
        style={{
          background: "rgba(7,8,24,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
              style={{
                background: "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
                boxShadow: "0 0 20px #9B6CFF66",
              }}
            >
              SSP
            </div>
            <span className="text-white font-bold text-sm tracking-wider hidden sm:block">
              SMART STUDENT
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                data-ocid={`nav.${item.id}.link`}
                onClick={() => onNavigate(item.id)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  color: currentPage === item.id ? "#4FE6FF" : "#AAB2C5",
                  background:
                    currentPage === item.id
                      ? "rgba(79,230,255,0.08)"
                      : "transparent",
                }}
              >
                {item.icon}
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #9B6CFF, #4FE6FF)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ color: "#AAB2C5" }}
            >
              <Bell size={16} />
            </button>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
                }}
              >
                <User size={13} className="text-white" />
              </div>
              <span className="text-white text-xs font-medium hidden sm:block">
                {userName}
              </span>
            </div>
            <button
              type="button"
              onClick={clear}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ color: "#AAB2C5", background: "rgba(255,255,255,0.05)" }}
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex gap-1 mt-2 overflow-x-auto pb-1">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              data-ocid={`nav.${item.id}.link`}
              onClick={() => onNavigate(item.id)}
              className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                color: currentPage === item.id ? "#4FE6FF" : "#AAB2C5",
                background:
                  currentPage === item.id
                    ? "rgba(79,230,255,0.1)"
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  currentPage === item.id
                    ? "rgba(79,230,255,0.3)"
                    : "rgba(255,255,255,0.06)"
                }`,
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Page content */}
      <main
        className="pt-20 md:pt-16 min-h-screen"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
      </main>
    </div>
  );
}
