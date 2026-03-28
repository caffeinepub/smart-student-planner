import { Clock, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import {
  type TimetableEntry,
  getTimetable,
  saveTimetable,
} from "../utils/localData";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const COLORS = [
  "#4FE6FF",
  "#9B6CFF",
  "#C65BFF",
  "#44F0D3",
  "#FFB84A",
  "#FF5A6A",
  "#4BE38A",
];

const defaultForm = {
  subject: "",
  day: "Monday",
  startTime: "09:00",
  endTime: "10:00",
  venue: "",
  color: COLORS[0],
};

export default function TimetablePage() {
  const [entries, setEntries] = useState<TimetableEntry[]>(getTimetable());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const save = () => {
    if (!form.subject.trim()) return;
    const newEntry: TimetableEntry = { ...form, id: Date.now().toString() };
    const updated = [...entries, newEntry];
    setEntries(updated);
    saveTimetable(updated);
    setForm(defaultForm);
    setShowForm(false);
  };

  const remove = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveTimetable(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider">
            TIMETABLE
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your weekly class schedule
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{
            background: "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
            boxShadow: "0 0 20px rgba(155,108,255,0.4)",
          }}
        >
          <Plus size={16} /> Add Class
        </motion.button>
      </div>

      {/* Add form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
            }}
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(28,33,64,0.98), rgba(20,24,44,0.99))",
                border: "1px solid rgba(155,108,255,0.3)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.6)",
              }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Add Class</h3>
              <div className="space-y-3">
                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  placeholder="Subject name"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <select
                  value={form.day}
                  onChange={(e) => setForm({ ...form, day: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{
                    background: "rgba(28,33,64,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) =>
                      setForm({ ...form, startTime: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) =>
                      setForm({ ...form, endTime: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
                <input
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  placeholder="Venue / Room"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <div className="flex gap-2">
                  {COLORS.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className="w-7 h-7 rounded-full transition-transform"
                      style={{
                        background: c,
                        transform: form.color === c ? "scale(1.3)" : "scale(1)",
                        boxShadow: form.color === c ? `0 0 10px ${c}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-xl text-gray-400 text-sm"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={save}
                  className="flex-1 py-3 rounded-xl text-white text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
                  }}
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weekly grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DAYS.map((day, di) => {
          const dayEntries = entries.filter((e) => e.day === day);
          return (
            <GlassCard
              key={day}
              delay={di * 0.06}
              glowColor="#4FE6FF"
              hover={false}
            >
              <h3 className="text-cyan-400 font-bold text-sm mb-3 tracking-wide">
                {day.toUpperCase()}
              </h3>
              {dayEntries.length === 0 ? (
                <p className="text-gray-600 text-xs">No classes</p>
              ) : (
                <div className="space-y-2">
                  {dayEntries
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((entry) => (
                      <motion.div
                        key={entry.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start justify-between p-3 rounded-xl group"
                        style={{
                          background: `${entry.color}15`,
                          border: `1px solid ${entry.color}33`,
                        }}
                      >
                        <div>
                          <p className="text-white text-xs font-semibold">
                            {entry.subject}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Clock size={10} style={{ color: entry.color }} />
                            <span
                              className="text-xs"
                              style={{ color: entry.color }}
                            >
                              {entry.startTime} – {entry.endTime}
                            </span>
                          </div>
                          {entry.venue && (
                            <p className="text-gray-500 text-xs mt-0.5">
                              {entry.venue}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(entry.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
                          style={{ color: "#FF5A6A" }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </motion.div>
                    ))}
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
