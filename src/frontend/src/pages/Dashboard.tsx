import {
  ArrowRight,
  BookOpen,
  Cake,
  CalendarDays,
  CheckSquare,
  Clock,
  Code2,
} from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";
import { GlassCard } from "../components/GlassCard";
import { getTimetable } from "../utils/localData";
import { getBooks } from "../utils/localData";
import { getLanguages } from "../utils/localData";

interface DashboardProps {
  onNavigate: (page: Page) => void;
  userName: string;
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Dashboard({ onNavigate, userName }: DashboardProps) {
  const today = DAYS[new Date().getDay()];
  const timetable = getTimetable();
  const todayClasses = timetable.filter((e) => e.day === today).slice(0, 3);
  const books = getBooks()
    .filter((b) => b.status === "reading")
    .slice(0, 3);
  const languages = getLanguages().slice(0, 3);

  const cards = [
    {
      id: "timetable" as Page,
      title: "Today's Classes",
      icon: <Clock size={18} />,
      glow: "#4FE6FF",
      content: todayClasses.length ? (
        <div className="space-y-2">
          {todayClasses.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-2 rounded-lg"
              style={{ background: "rgba(79,230,255,0.08)" }}
            >
              <span className="text-white text-xs font-medium">
                {c.subject}
              </span>
              <span className="text-cyan-400 text-xs">{c.startTime}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No classes today</p>
      ),
    },
    {
      id: "tasks" as Page,
      title: "To-Do Tasks",
      icon: <CheckSquare size={18} />,
      glow: "#9B6CFF",
      content: (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Pending tasks</span>
            <span className="text-violet-400 text-lg font-bold">—</span>
          </div>
          <p className="text-gray-500 text-xs">
            Open Tasks page to manage your todos
          </p>
        </div>
      ),
    },
    {
      id: "reading" as Page,
      title: "Currently Reading",
      icon: <BookOpen size={18} />,
      glow: "#44F0D3",
      content: books.length ? (
        <div className="space-y-2">
          {books.map((b) => {
            const pct =
              b.totalPages > 0
                ? Math.round((b.currentPage / b.totalPages) * 100)
                : 0;
            return (
              <div key={b.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-white text-xs truncate max-w-[70%]">
                    {b.title}
                  </span>
                  <span className="text-teal-400 text-xs">{pct}%</span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: "linear-gradient(90deg, #44F0D3, #9B6CFF)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No books in progress</p>
      ),
    },
    {
      id: "coding" as Page,
      title: "Coding Progress",
      icon: <Code2 size={18} />,
      glow: "#C65BFF",
      content: languages.length ? (
        <div className="space-y-2">
          {languages.map((lang) => {
            const total = lang.topics.length;
            const done = lang.topics.filter((t) => t.completed).length;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            return (
              <div key={lang.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-white text-xs">{lang.name}</span>
                  <span className="text-purple-400 text-xs">{pct}%</span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${lang.color}, #4FE6FF)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No languages tracked yet</p>
      ),
    },
    {
      id: "calendar" as Page,
      title: "Upcoming Events",
      icon: <CalendarDays size={18} />,
      glow: "#FFB84A",
      content: (
        <p className="text-gray-500 text-sm">Open Calendar to view events</p>
      ),
    },
    {
      id: "birthdays" as Page,
      title: "Birthdays",
      icon: <Cake size={18} />,
      glow: "#FF5A6A",
      content: (
        <p className="text-gray-500 text-sm">
          Open Birthdays to see upcoming celebrations
        </p>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-gray-500 text-xs tracking-widest uppercase mb-1">
          Welcome back
        </p>
        <h1
          className="text-3xl md:text-4xl font-black tracking-wider text-white"
          style={{
            background: "linear-gradient(135deg, #fff, #9B6CFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "white",
          }}
        >
          {userName.toUpperCase()}
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, i) => (
          <GlassCard
            key={card.id}
            glowColor={card.glow}
            delay={i * 0.08}
            onClick={() => onNavigate(card.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span style={{ color: card.glow }}>{card.icon}</span>
                <h3 className="text-white font-semibold text-sm">
                  {card.title}
                </h3>
              </div>
              <ArrowRight size={14} className="text-gray-600" />
            </div>
            {card.content}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
