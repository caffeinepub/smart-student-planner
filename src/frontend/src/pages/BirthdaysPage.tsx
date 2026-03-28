import { Cake, Gift, PartyPopper, Plus } from "lucide-react";

const CONFETTI_PIECES = Array.from({ length: 12 }, (_, ci) => ({
  id: `cp-${ci}`,
  color: ["#C65BFF", "#4FE6FF", "#FFB84A", "#4BE38A", "#FF5A6A"][ci % 5],
  left: `${ci * 8 + 2}%`,
}));
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { addToast } from "../components/ToastNotification";
import type { BackendActor, BirthdayReminder } from "../types/appTypes";

interface BirthdaysPageProps {
  actor: BackendActor | null;
}

export default function BirthdaysPage({ actor }: BirthdaysPageProps) {
  const [reminders, setReminders] = useState<BirthdayReminder[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", birthdate: "", relation: "" });

  useEffect(() => {
    if (actor?.getReminders) {
      actor
        .getReminders()
        .then((data: BirthdayReminder[]) => {
          setReminders(data);
          const today = new Date();
          for (const r of data) {
            const bd = new Date(Number(r.birthdate) / 1_000_000);
            if (
              bd.getMonth() === today.getMonth() &&
              bd.getDate() === today.getDate()
            ) {
              addToast({
                type: "birthday",
                title: "Happy Birthday!",
                message: `Today is ${r.name}'s birthday! 🎉`,
              });
            }
          }
        })
        .catch(() => {});
    }
  }, [actor]);

  const addReminder = async () => {
    if (!form.name.trim() || !form.birthdate || !actor?.createReminder) return;
    const ms = new Date(form.birthdate).getTime();
    const reminder: BirthdayReminder = {
      id: Date.now(),
      name: form.name,
      birthdate: BigInt(ms) * 1_000_000n,
      relation: form.relation,
    };
    await actor.createReminder(reminder);
    const updated = await actor.getReminders();
    setReminders(updated);
    setForm({ name: "", birthdate: "", relation: "" });
    setShowForm(false);
  };

  const getDaysUntil = (ts: bigint) => {
    const today = new Date();
    const bd = new Date(Number(ts) / 1_000_000);
    const next = new Date(today.getFullYear(), bd.getMonth(), bd.getDate());
    if (next < today) next.setFullYear(today.getFullYear() + 1);
    return Math.ceil((next.getTime() - today.getTime()) / 86_400_000);
  };

  const isToday = (ts: bigint) => {
    const today = new Date();
    const bd = new Date(Number(ts) / 1_000_000);
    return (
      bd.getMonth() === today.getMonth() && bd.getDate() === today.getDate()
    );
  };

  const sorted = [...reminders].sort(
    (a, b) => getDaysUntil(a.birthdate) - getDaysUntil(b.birthdate),
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider">
            BIRTHDAYS
          </h2>
          <p className="text-gray-500 text-sm">
            {reminders.length} birthdays tracked
          </p>
        </div>
        {actor && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
            style={{
              background: "linear-gradient(135deg, #FF5A6A, #C65BFF)",
              boxShadow: "0 0 20px rgba(255,90,106,0.3)",
            }}
          >
            <Plus size={16} /> Add Birthday
          </motion.button>
        )}
      </div>

      {!actor && (
        <p className="text-gray-500 text-sm mb-4">
          Connect to save birthdays to the blockchain.
        </p>
      )}

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
              className="w-full max-w-sm rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(28,33,64,0.98), rgba(20,24,44,0.99))",
                border: "1px solid rgba(255,90,106,0.3)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.6)",
              }}
            >
              <h3 className="text-white font-bold text-lg mb-4">
                Add Birthday
              </h3>
              <div className="space-y-3">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Person's name"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <input
                  type="date"
                  value={form.birthdate}
                  onChange={(e) =>
                    setForm({ ...form, birthdate: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    colorScheme: "dark",
                  }}
                />
                <input
                  value={form.relation}
                  onChange={(e) =>
                    setForm({ ...form, relation: e.target.value })
                  }
                  placeholder="Relation (e.g. Friend, Family)"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
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
                  onClick={addReminder}
                  className="flex-1 py-3 rounded-xl text-white text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #FF5A6A, #C65BFF)",
                  }}
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((r, i) => {
          const days = getDaysUntil(r.birthdate);
          const bd = new Date(Number(r.birthdate) / 1_000_000);
          const celebrating = isToday(r.birthdate);

          return (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: celebrating
                  ? "linear-gradient(135deg, rgba(198,91,255,0.2), rgba(255,90,106,0.15))"
                  : "linear-gradient(135deg, rgba(28,33,64,0.85), rgba(20,24,44,0.9))",
                backdropFilter: "blur(16px)",
                border: `1px solid ${celebrating ? "rgba(198,91,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                boxShadow: celebrating
                  ? "0 8px 32px rgba(198,91,255,0.2)"
                  : "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              {celebrating && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {CONFETTI_PIECES.map((piece, ci) => (
                    <motion.div
                      key={piece.id}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: piece.color,
                        left: piece.left,
                        top: "10%",
                      }}
                      animate={{
                        y: [0, 60, 120],
                        opacity: [1, 0.8, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: ci * 0.15,
                        ease: "easeIn",
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: celebrating
                      ? "rgba(198,91,255,0.3)"
                      : "rgba(255,255,255,0.06)",
                  }}
                >
                  {celebrating ? (
                    <PartyPopper size={18} style={{ color: "#C65BFF" }} />
                  ) : (
                    <Cake size={18} style={{ color: "#FFB84A" }} />
                  )}
                </div>
                <div className="text-right">
                  {celebrating ? (
                    <span
                      className="px-2 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: "rgba(198,91,255,0.3)",
                        color: "#C65BFF",
                      }}
                    >
                      Today! 🎉
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      {days === 1 ? "Tomorrow" : `in ${days} days`}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-white font-bold text-sm">{r.name}</h3>
              {r.relation && (
                <p className="text-gray-500 text-xs mt-0.5">{r.relation}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                {bd.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              {days <= 7 && !celebrating && (
                <div className="mt-2 flex items-center gap-1">
                  <Gift size={12} style={{ color: "#FFB84A" }} />
                  <span className="text-xs" style={{ color: "#FFB84A" }}>
                    Coming soon!
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {reminders.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-sm">
            No birthdays added yet. Never forget a special day!
          </p>
        </div>
      )}
    </div>
  );
}
