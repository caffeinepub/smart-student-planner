import { CheckCircle, Circle, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  type CodingLanguage,
  getLanguages,
  saveLanguages,
} from "../utils/localData";

const LANG_COLORS = [
  "#4FE6FF",
  "#9B6CFF",
  "#C65BFF",
  "#44F0D3",
  "#FFB84A",
  "#FF5A6A",
  "#4BE38A",
];

export default function CodingPage() {
  const [languages, setLanguages] = useState<CodingLanguage[]>(getLanguages());
  const [showLangForm, setShowLangForm] = useState(false);
  const [showTopicForm, setShowTopicForm] = useState<string | null>(null);
  const [langForm, setLangForm] = useState({ name: "", color: LANG_COLORS[0] });
  const [topicName, setTopicName] = useState("");

  const update = (updated: CodingLanguage[]) => {
    setLanguages(updated);
    saveLanguages(updated);
  };

  const addLang = () => {
    if (!langForm.name.trim()) return;
    update([
      ...languages,
      { id: Date.now().toString(), ...langForm, topics: [] },
    ]);
    setLangForm({ name: "", color: LANG_COLORS[0] });
    setShowLangForm(false);
  };

  const addTopic = (langId: string) => {
    if (!topicName.trim()) return;
    update(
      languages.map((l) =>
        l.id === langId
          ? {
              ...l,
              topics: [
                ...l.topics,
                {
                  id: Date.now().toString(),
                  name: topicName.trim(),
                  completed: false,
                },
              ],
            }
          : l,
      ),
    );
    setTopicName("");
    setShowTopicForm(null);
  };

  const toggleTopic = (langId: string, topicId: string) => {
    update(
      languages.map((l) =>
        l.id === langId
          ? {
              ...l,
              topics: l.topics.map((t) =>
                t.id === topicId ? { ...t, completed: !t.completed } : t,
              ),
            }
          : l,
      ),
    );
  };

  const removeLang = (id: string) =>
    update(languages.filter((l) => l.id !== id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider">
            CODING TRACKER
          </h2>
          <p className="text-gray-500 text-sm">
            {languages.length} languages tracked
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowLangForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{
            background: "linear-gradient(135deg, #C65BFF, #9B6CFF)",
            boxShadow: "0 0 20px rgba(198,91,255,0.3)",
          }}
        >
          <Plus size={16} /> Add Language
        </motion.button>
      </div>

      <AnimatePresence>
        {showLangForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
            }}
            onClick={(e) =>
              e.target === e.currentTarget && setShowLangForm(false)
            }
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-sm rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(28,33,64,0.98), rgba(20,24,44,0.99))",
                border: "1px solid rgba(198,91,255,0.3)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.6)",
              }}
            >
              <h3 className="text-white font-bold text-lg mb-4">
                Add Language
              </h3>
              <input
                value={langForm.name}
                onChange={(e) =>
                  setLangForm({ ...langForm, name: e.target.value })
                }
                placeholder="Language name (e.g. Python)"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none mb-3"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
              <div className="flex gap-2 mb-4">
                {LANG_COLORS.map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setLangForm({ ...langForm, color: c })}
                    className="w-7 h-7 rounded-full"
                    style={{
                      background: c,
                      transform:
                        langForm.color === c ? "scale(1.3)" : "scale(1)",
                      boxShadow:
                        langForm.color === c ? `0 0 10px ${c}` : "none",
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLangForm(false)}
                  className="flex-1 py-3 rounded-xl text-gray-400 text-sm"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addLang}
                  className="flex-1 py-3 rounded-xl text-white text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #C65BFF, #9B6CFF)",
                  }}
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {languages.map((lang, i) => {
          const total = lang.topics.length;
          const done = lang.topics.filter((t) => t.completed).length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;

          return (
            <motion.div
              key={lang.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl p-5 group"
              style={{
                background:
                  "linear-gradient(135deg, rgba(28,33,64,0.85), rgba(20,24,44,0.9))",
                backdropFilter: "blur(16px)",
                border: `1px solid ${lang.color}33`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${lang.color}15`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black"
                    style={{
                      background: `${lang.color}22`,
                      color: lang.color,
                      border: `1px solid ${lang.color}44`,
                    }}
                  >
                    {lang.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">
                      {lang.name}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      {done}/{total} topics
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10">
                    <svg
                      className="w-10 h-10 -rotate-90"
                      viewBox="0 0 36 36"
                      aria-label={`${lang.name} progress: ${pct}%`}
                      role="img"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke={lang.color}
                        strokeWidth="3"
                        strokeDasharray={`${pct * 0.879} 87.9`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                      style={{ color: lang.color }}
                    >
                      {pct}%
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLang(lang.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#FF5A6A" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {lang.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="flex items-center gap-2 p-2 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleTopic(lang.id, topic.id)}
                    >
                      {topic.completed ? (
                        <CheckCircle size={14} style={{ color: lang.color }} />
                      ) : (
                        <Circle size={14} style={{ color: "#AAB2C5" }} />
                      )}
                    </button>
                    <span
                      className={`text-xs ${
                        topic.completed
                          ? "line-through text-gray-600"
                          : "text-gray-300"
                      }`}
                    >
                      {topic.name}
                    </span>
                  </div>
                ))}
              </div>

              {showTopicForm === lang.id ? (
                <div className="flex gap-2 mt-3">
                  <input
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTopic(lang.id)}
                    placeholder="Topic name..."
                    className="flex-1 px-3 py-2 rounded-lg text-white text-xs outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addTopic(lang.id)}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-white"
                    style={{ background: `${lang.color}44` }}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTopicForm(null)}
                    className="px-2 py-2 rounded-lg text-gray-500 text-xs"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowTopicForm(lang.id)}
                  className="flex items-center gap-1 mt-3 text-xs"
                  style={{ color: lang.color }}
                >
                  <Plus size={12} /> Add topic
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {languages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-sm">
            No languages tracked. Add your first language!
          </p>
        </div>
      )}
    </div>
  );
}
