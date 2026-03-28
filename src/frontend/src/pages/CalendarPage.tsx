import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { BackendActor, CalendarEvent } from "../types/appTypes";

interface CalendarPageProps {
  actor: BackendActor | null;
}

const EVENT_COLORS = [
  "#4FE6FF",
  "#9B6CFF",
  "#C65BFF",
  "#44F0D3",
  "#FFB84A",
  "#FF5A6A",
  "#4BE38A",
];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage({ actor }: CalendarPageProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    note: "",
    color: EVENT_COLORS[0],
  });

  useEffect(() => {
    if (actor?.getEvents) {
      actor
        .getEvents()
        .then(setEvents)
        .catch(() => {});
    }
  }, [actor]);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const toDateStr = (d: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const getEventsForDate = (dateStr: string) =>
    events.filter((e) => {
      const d = new Date(Number(e.date) / 1_000_000);
      return (
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` ===
        dateStr
      );
    });

  const addEvent = async () => {
    if (!form.title.trim() || !selectedDate || !actor?.createEvent) return;
    const dateParts = selectedDate.split("-").map(Number);
    const dateMs = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2],
    ).getTime();
    const event: CalendarEvent = {
      id: Date.now(),
      title: form.title,
      date: BigInt(dateMs) * 1_000_000n,
      note: form.note,
      color: form.color,
    };
    await actor.createEvent(event);
    const updated = await actor.getEvents();
    setEvents(updated);
    setForm({ title: "", note: "", color: EVENT_COLORS[0] });
    setShowForm(false);
  };

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  const emptyCells = Array.from(
    { length: firstDayOfMonth },
    (_, i) => `empty-${month}-${year}-${i}`,
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider">
            CALENDAR
          </h2>
          <p className="text-gray-500 text-sm">
            {events.length} events scheduled
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Calendar grid */}
        <div
          className="lg:col-span-2 rounded-2xl p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(28,33,64,0.85), rgba(20,24,44,0.9))",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <ChevronLeft size={16} className="text-gray-400" />
            </button>
            <h3 className="text-white font-bold">
              {MONTH_NAMES[month]} {year}
            </h3>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAY_NAMES.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium py-2"
                style={{ color: "#AAB2C5" }}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {emptyCells.map((cellKey) => (
              <div key={cellKey} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const dateStr = toDateStr(d);
              const dayEvents = getEventsForDate(dateStr);
              const isToday = dateStr === today;
              const isSelected = dateStr === selectedDate;

              return (
                <motion.button
                  type="button"
                  key={dateStr}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(dateStr)}
                  className="aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 text-sm font-medium"
                  style={{
                    background: isSelected
                      ? "rgba(155,108,255,0.3)"
                      : isToday
                        ? "rgba(79,230,255,0.15)"
                        : "rgba(255,255,255,0.03)",
                    border: `1px solid ${
                      isSelected
                        ? "rgba(155,108,255,0.6)"
                        : isToday
                          ? "rgba(79,230,255,0.4)"
                          : "rgba(255,255,255,0.04)"
                    }`,
                    color: isToday
                      ? "#4FE6FF"
                      : isSelected
                        ? "#fff"
                        : "#AAB2C5",
                  }}
                >
                  {d}
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5">
                      {dayEvents.slice(0, 3).map((ev) => (
                        <div
                          key={ev.id}
                          className="w-1 h-1 rounded-full"
                          style={{ background: ev.color }}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Events panel */}
        <div
          className="rounded-2xl p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(28,33,64,0.85), rgba(20,24,44,0.9))",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-sm">
              {selectedDate
                ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric" },
                  )
                : "Select a date"}
            </h3>
            {selectedDate && actor?.createEvent && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(155,108,255,0.3)" }}
              >
                <Plus size={14} className="text-violet-400" />
              </button>
            )}
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-xl"
                style={{
                  background: "rgba(155,108,255,0.1)",
                  border: "1px solid rgba(155,108,255,0.2)",
                }}
              >
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Event title"
                  className="w-full px-3 py-2 rounded-lg text-white text-xs outline-none mb-2"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <input
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Note (optional)"
                  className="w-full px-3 py-2 rounded-lg text-white text-xs outline-none mb-2"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <div className="flex gap-1.5 mb-2">
                  {EVENT_COLORS.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className="w-5 h-5 rounded-full"
                      style={{
                        background: c,
                        transform: form.color === c ? "scale(1.3)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-1.5 rounded-lg text-gray-400 text-xs"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={addEvent}
                    className="flex-1 py-1.5 rounded-lg text-white text-xs font-bold"
                    style={{ background: "rgba(155,108,255,0.6)" }}
                  >
                    Add
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            {selectedEvents.length === 0 ? (
              <p className="text-gray-600 text-xs">No events on this date</p>
            ) : (
              selectedEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-xl"
                  style={{
                    background: `${ev.color}15`,
                    border: `1px solid ${ev.color}33`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: ev.color }}
                    />
                    <p className="text-white text-xs font-semibold">
                      {ev.title}
                    </p>
                  </div>
                  {ev.note && (
                    <p className="text-gray-500 text-xs mt-1 ml-4">{ev.note}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
