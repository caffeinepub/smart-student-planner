import { Flame, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Habit {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  checkIns: string[];
}

const STORAGE_KEY = "ssp_habits";
const REMINDER_KEY = "ssp_habit_reminder_date";

function toDateStr(date: Date): string {
  return date.toISOString().split("T")[0];
}

function calcCurrentStreak(checkIns: string[]): number {
  const today = toDateStr(new Date());
  const set = new Set(checkIns);
  let streak = 0;
  const d = new Date();
  if (!set.has(today)) {
    d.setDate(d.getDate() - 1);
  }
  while (set.has(toDateStr(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function calcLongestStreak(checkIns: string[]): number {
  if (checkIns.length === 0) return 0;
  const sorted = [...checkIns].sort();
  let max = 1;
  let cur = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (curr.getTime() - prev.getTime()) / 86400000;
    if (diff === 1) {
      cur++;
      if (cur > max) max = cur;
    } else if (diff > 1) {
      cur = 1;
    }
  }
  return max;
}

function getLast30Days(): string[] {
  const days: string[] = [];
  const d = new Date();
  for (let i = 29; i >= 0; i--) {
    const day = new Date(d);
    day.setDate(d.getDate() - i);
    days.push(toDateStr(day));
  }
  return days;
}

function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHabits(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

const glass = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  borderRadius: "16px",
};

export default function HabitTrackerPage() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [adding, setAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  useEffect(() => {
    const today = toDateStr(new Date());
    const lastReminder = localStorage.getItem(REMINDER_KEY);
    if (lastReminder === today) return;
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      new Notification("Smart Student Planner", {
        body: "Don't forget to check in your habits today! 🔥",
        icon: "/favicon.ico",
      });
      localStorage.setItem(REMINDER_KEY, today);
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          new Notification("Smart Student Planner", {
            body: "Daily habit reminders are now enabled! 🔥",
            icon: "/favicon.ico",
          });
          localStorage.setItem(REMINDER_KEY, today);
        }
      });
    }
  }, []);

  const today = toDateStr(new Date());
  const last30 = getLast30Days();

  function addHabit() {
    if (!name.trim()) return;
    const habit: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: desc.trim() || undefined,
      createdAt: new Date().toISOString(),
      checkIns: [],
    };
    setHabits((prev) => [...prev, habit]);
    setName("");
    setDesc("");
    setAdding(false);
  }

  function checkIn(id: string) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              checkIns: h.checkIns.includes(today)
                ? h.checkIns
                : [...h.checkIns, today],
            }
          : h,
      ),
    );
  }

  function deleteHabit(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    setDeleteConfirm(null);
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-2">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span style={{ filter: "drop-shadow(0 0 12px #FF6B35)" }}>🔥</span>
            Habit Tracker
          </h1>
          <p style={{ color: "#AAB2C5" }} className="text-sm mt-1">
            Build consistency. Track your daily habits.
          </p>
        </div>
        <button
          type="button"
          data-ocid="habits.open_modal_button"
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
            boxShadow: "0 0 20px #9B6CFF44",
          }}
        >
          <Plus size={16} />
          New Habit
        </button>
      </motion.div>

      {/* Add Habit Modal */}
      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setAdding(false);
            }}
          >
            <motion.div
              data-ocid="habits.dialog"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-md p-6"
              style={glass}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold text-lg">
                  Create New Habit
                </h2>
                <button
                  type="button"
                  data-ocid="habits.close_button"
                  onClick={() => setAdding(false)}
                  style={{ color: "#AAB2C5" }}
                  className="hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p
                    className="text-xs font-medium mb-1"
                    style={{ color: "#AAB2C5" }}
                  >
                    Habit Name *
                  </p>
                  <input
                    id="habit-name"
                    data-ocid="habits.input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addHabit();
                    }}
                    placeholder="e.g. Solve LeetCode, Workout, Read..."
                    className="w-full px-3 py-2 rounded-xl text-sm placeholder:text-gray-600 outline-none focus:ring-2"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                    }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs font-medium mb-1"
                    style={{ color: "#AAB2C5" }}
                  >
                    Description (optional)
                  </p>
                  <textarea
                    id="habit-desc"
                    data-ocid="habits.textarea"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="What's this habit about?"
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl text-sm placeholder:text-gray-600 outline-none resize-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                    }}
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    data-ocid="habits.cancel_button"
                    onClick={() => setAdding(false)}
                    className="flex-1 py-2 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "#AAB2C5",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    data-ocid="habits.submit_button"
                    onClick={addHabit}
                    disabled={!name.trim()}
                    className="flex-1 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
                    }}
                  >
                    Add Habit
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {habits.length === 0 && (
        <motion.div
          data-ocid="habits.empty_state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center py-20 px-6"
          style={glass}
        >
          <div
            className="text-6xl mb-4"
            style={{ filter: "drop-shadow(0 0 20px #FF6B35)" }}
          >
            🔥
          </div>
          <h3 className="text-white font-bold text-xl mb-2">No habits yet</h3>
          <p style={{ color: "#AAB2C5" }} className="text-sm max-w-sm mx-auto">
            Add your first habit to start tracking! Build streaks, visualize
            consistency, and stay accountable.
          </p>
          <button
            type="button"
            data-ocid="habits.primary_button"
            onClick={() => setAdding(true)}
            className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2 hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
              boxShadow: "0 0 20px #9B6CFF44",
            }}
          >
            <Plus size={16} />
            Create First Habit
          </button>
        </motion.div>
      )}

      {/* Habit Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {habits.map((habit, idx) => {
            const checkedToday = habit.checkIns.includes(today);
            const currentStreak = calcCurrentStreak(habit.checkIns);
            const longestStreak = calcLongestStreak(habit.checkIns);
            const checkInSet = new Set(habit.checkIns);

            return (
              <motion.div
                key={habit.id}
                data-ocid={`habits.item.${idx + 1}`}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{
                  delay: idx * 0.06,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                className="p-5"
                style={glass}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-bold text-base">
                        {habit.name}
                      </h3>
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #FF6B35, #FF8C42)",
                          boxShadow:
                            currentStreak > 0 ? "0 0 12px #FF6B3566" : "none",
                        }}
                      >
                        🔥 {currentStreak} day{currentStreak !== 1 ? "s" : ""}
                      </span>
                    </div>
                    {habit.description && (
                      <p
                        className="text-xs mt-1 truncate"
                        style={{ color: "#AAB2C5" }}
                      >
                        {habit.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <motion.button
                      type="button"
                      data-ocid={`habits.toggle.${idx + 1}`}
                      onClick={() => checkIn(habit.id)}
                      disabled={checkedToday}
                      whileTap={checkedToday ? {} : { scale: 0.9 }}
                      animate={checkedToday ? { scale: [1, 1.1, 1] } : {}}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all disabled:cursor-default"
                      style={{
                        background: checkedToday
                          ? "linear-gradient(135deg, #22c55e, #16a34a)"
                          : "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
                        boxShadow: checkedToday
                          ? "0 0 12px #22c55e44"
                          : "0 0 12px #9B6CFF44",
                      }}
                    >
                      {checkedToday ? "✓ Done" : "Check In"}
                    </motion.button>
                    <button
                      type="button"
                      data-ocid={`habits.delete_button.${idx + 1}`}
                      onClick={() => setDeleteConfirm(habit.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/20"
                      style={{ color: "#AAB2C5" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* 30-day consistency grid */}
                <div className="mb-3">
                  <p className="text-xs mb-2" style={{ color: "#AAB2C5" }}>
                    Last 30 days
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {last30.map((day) => {
                      const isToday = day === today;
                      const done = checkInSet.has(day);
                      return (
                        <div
                          key={day}
                          title={day}
                          className="w-5 h-5 rounded-sm transition-all"
                          style={{
                            background: done
                              ? "#4FE6FF"
                              : "rgba(255,255,255,0.05)",
                            boxShadow: done ? "0 0 8px #4FE6FF" : "none",
                            opacity: done ? 1 : 0.35,
                            border: isToday
                              ? "2px solid #9B6CFF"
                              : "1px solid rgba(255,255,255,0.05)",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Analytics Row */}
                <div
                  className="flex items-center gap-4 pt-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-1.5">
                    <Flame size={14} style={{ color: "#FF6B35" }} />
                    <span className="text-xs" style={{ color: "#AAB2C5" }}>
                      Current Streak:{" "}
                      <span className="text-white font-semibold">
                        {currentStreak} day{currentStreak !== 1 ? "s" : ""}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs" style={{ color: "#4FE6FF" }}>
                      ⭐
                    </span>
                    <span className="text-xs" style={{ color: "#AAB2C5" }}>
                      Longest Streak:{" "}
                      <span className="text-white font-semibold">
                        {longestStreak} day{longestStreak !== 1 ? "s" : ""}
                      </span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(4px)",
            }}
          >
            <motion.div
              data-ocid="habits.dialog"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-sm p-6 text-center"
              style={glass}
            >
              <div className="text-4xl mb-3">🗑️</div>
              <h3 className="text-white font-bold text-lg mb-2">
                Delete Habit?
              </h3>
              <p className="text-sm mb-5" style={{ color: "#AAB2C5" }}>
                This will permanently delete the habit and all its check-in
                history.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  data-ocid="habits.cancel_button"
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: "#AAB2C5",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-ocid="habits.confirm_button"
                  onClick={() => deleteHabit(deleteConfirm)}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    boxShadow: "0 0 12px #ef444444",
                  }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
