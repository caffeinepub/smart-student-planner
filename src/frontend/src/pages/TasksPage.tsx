import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Circle,
  Plus,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { GlassCard } from "../components/GlassCard";
import type { BackendActor } from "../types/appTypes";

interface TasksPageProps {
  actor: BackendActor | null;
}

interface LocalTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  subtasks: { id: string; text: string; done: boolean }[];
}

export default function TasksPage({ actor }: TasksPageProps) {
  const [tasks, setTasks] = useState<LocalTask[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("ssp_tasks") || "[]");
    } catch {
      return [];
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium" as "High" | "Medium" | "Low",
  });
  const [newSubtask, setNewSubtask] = useState<Record<string, string>>({});

  // Load backend todos on mount
  useEffect(() => {
    if (actor?.getTodosWithSubtasks) {
      actor.getTodosWithSubtasks().catch(() => {});
    }
  }, [actor]);

  const saveTasks = (updated: LocalTask[]) => {
    setTasks(updated);
    localStorage.setItem("ssp_tasks", JSON.stringify(updated));
  };

  const addTask = () => {
    if (!form.title.trim()) return;
    const task: LocalTask = {
      id: Date.now().toString(),
      ...form,
      completed: false,
      subtasks: [],
    };
    saveTasks([task, ...tasks]);
    setForm({ title: "", description: "", priority: "Medium" });
    setShowForm(false);
  };

  const toggleTask = (id: string) => {
    saveTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const removeTask = (id: string) =>
    saveTasks(tasks.filter((t) => t.id !== id));

  const addSubtask = (taskId: string) => {
    const text = newSubtask[taskId]?.trim();
    if (!text) return;
    saveTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: [
                ...t.subtasks,
                { id: Date.now().toString(), text, done: false },
              ],
            }
          : t,
      ),
    );
    setNewSubtask((prev) => ({ ...prev, [taskId]: "" }));
  };

  const toggleSubtask = (taskId: string, stId: string) => {
    saveTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.id === stId ? { ...s, done: !s.done } : s,
              ),
            }
          : t,
      ),
    );
  };

  const priorityColor: Record<string, string> = {
    High: "#FF5A6A",
    Medium: "#FFB84A",
    Low: "#4BE38A",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider">
            TASKS
          </h2>
          <p className="text-gray-500 text-sm">
            {tasks.filter((t) => !t.completed).length} pending &middot;{" "}
            {tasks.filter((t) => t.completed).length} done
          </p>
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{
            background: "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
            boxShadow: "0 0 20px rgba(155,108,255,0.4)",
          }}
        >
          <Plus size={16} /> New Task
        </motion.button>
      </div>

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
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-md rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(28,33,64,0.98), rgba(20,24,44,0.99))",
                border: "1px solid rgba(155,108,255,0.3)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.6)",
              }}
            >
              <h3 className="text-white font-bold text-lg mb-4">New Task</h3>
              <div className="space-y-3">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Task title"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Description (optional)"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <div className="flex gap-2">
                  {(["High", "Medium", "Low"] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setForm({ ...form, priority: p })}
                      className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                      style={{
                        background:
                          form.priority === p
                            ? `${priorityColor[p]}33`
                            : "rgba(255,255,255,0.05)",
                        border: `1px solid ${form.priority === p ? priorityColor[p] : "rgba(255,255,255,0.08)"}`,
                        color: priorityColor[p],
                      }}
                    >
                      {p}
                    </button>
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
                  onClick={addTask}
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

      <div className="space-y-3">
        <AnimatePresence>
          {tasks.map((task, i) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: i * 0.04 }}
            >
              <div
                className="rounded-2xl p-4"
                style={{
                  background: task.completed
                    ? "rgba(75,227,138,0.05)"
                    : "linear-gradient(135deg, rgba(28,33,64,0.85), rgba(20,24,44,0.9))",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${task.completed ? "rgba(75,227,138,0.2)" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className="mt-0.5 transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle size={20} style={{ color: "#4BE38A" }} />
                      ) : (
                        <Circle size={20} style={{ color: "#AAB2C5" }} />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p
                          className={`text-sm font-semibold ${task.completed ? "line-through text-gray-500" : "text-white"}`}
                        >
                          {task.title}
                        </p>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{
                            background: `${priorityColor[task.priority]}22`,
                            color: priorityColor[task.priority],
                          }}
                        >
                          {task.priority}
                        </span>
                      </div>
                      {task.description && (
                        <p className="text-gray-500 text-xs mt-1">
                          {task.description}
                        </p>
                      )}
                      {task.subtasks.length > 0 && (
                        <p className="text-gray-600 text-xs mt-1">
                          {task.subtasks.filter((s) => s.done).length}/
                          {task.subtasks.length} subtasks
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(expandedId === task.id ? null : task.id)
                      }
                      className="p-1 rounded"
                      style={{ color: "#AAB2C5" }}
                    >
                      {expandedId === task.id ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeTask(task.id)}
                      className="p-1 rounded"
                      style={{ color: "#FF5A6A" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === task.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-white/5">
                        {task.subtasks.map((st) => (
                          <div
                            key={st.id}
                            className="flex items-center gap-2 py-1"
                          >
                            <button
                              type="button"
                              onClick={() => toggleSubtask(task.id, st.id)}
                            >
                              {st.done ? (
                                <CheckCircle
                                  size={14}
                                  style={{ color: "#4BE38A" }}
                                />
                              ) : (
                                <Circle
                                  size={14}
                                  style={{ color: "#AAB2C5" }}
                                />
                              )}
                            </button>
                            <span
                              className={`text-xs ${st.done ? "line-through text-gray-600" : "text-gray-300"}`}
                            >
                              {st.text}
                            </span>
                          </div>
                        ))}
                        <div className="flex gap-2 mt-2">
                          <input
                            value={newSubtask[task.id] || ""}
                            onChange={(e) =>
                              setNewSubtask((prev) => ({
                                ...prev,
                                [task.id]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" && addSubtask(task.id)
                            }
                            placeholder="Add subtask..."
                            className="flex-1 px-3 py-1.5 rounded-lg text-white text-xs outline-none"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => addSubtask(task.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                            style={{ background: "rgba(155,108,255,0.3)" }}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {tasks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-sm">
              No tasks yet. Add your first task!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
