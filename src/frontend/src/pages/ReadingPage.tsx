import { BookOpen, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { type Book, getBooks, saveBooks } from "../utils/localData";

const BOOK_COLORS = [
  "#9B6CFF",
  "#4FE6FF",
  "#C65BFF",
  "#44F0D3",
  "#FFB84A",
  "#FF5A6A",
  "#4BE38A",
];
const STATUS_LABELS: Record<Book["status"], string> = {
  reading: "Reading",
  completed: "Completed",
  wishlist: "Wishlist",
};
const STATUS_COLORS: Record<Book["status"], string> = {
  reading: "#4FE6FF",
  completed: "#4BE38A",
  wishlist: "#FFB84A",
};

export default function ReadingPage() {
  const [books, setBooks] = useState<Book[]>(getBooks());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    totalPages: 200,
    currentPage: 0,
    status: "reading" as Book["status"],
    color: BOOK_COLORS[0],
  });

  const update = (updated: Book[]) => {
    setBooks(updated);
    saveBooks(updated);
  };

  const addBook = () => {
    if (!form.title.trim()) return;
    update([{ id: Date.now().toString(), ...form }, ...books]);
    setForm({
      title: "",
      author: "",
      totalPages: 200,
      currentPage: 0,
      status: "reading",
      color: BOOK_COLORS[0],
    });
    setShowForm(false);
  };

  const updateProgress = (id: string, page: number) => {
    update(
      books.map((b) =>
        b.id === id
          ? {
              ...b,
              currentPage: Math.max(0, Math.min(page, b.totalPages)),
              status: page >= b.totalPages ? "completed" : b.status,
            }
          : b,
      ),
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider">
            READING TRACKER
          </h2>
          <p className="text-gray-500 text-sm">
            {books.filter((b) => b.status === "reading").length} in progress ·{" "}
            {books.filter((b) => b.status === "completed").length} completed
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{
            background: "linear-gradient(135deg, #44F0D3, #9B6CFF)",
            boxShadow: "0 0 20px rgba(68,240,211,0.3)",
          }}
        >
          <Plus size={16} /> Add Book
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
                border: "1px solid rgba(68,240,211,0.3)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.6)",
              }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Add Book</h3>
              <div className="space-y-3">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Book title"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Author"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={form.totalPages}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        totalPages: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Total pages"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <input
                    type="number"
                    value={form.currentPage}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        currentPage: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Current page"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as Book["status"],
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{
                    background: "rgba(28,33,64,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <option value="reading">Currently Reading</option>
                  <option value="completed">Completed</option>
                  <option value="wishlist">Wishlist</option>
                </select>
                <div className="flex gap-2">
                  {BOOK_COLORS.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className="w-7 h-7 rounded-full"
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
                  onClick={addBook}
                  className="flex-1 py-3 rounded-xl text-white text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #44F0D3, #9B6CFF)",
                  }}
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bookshelf */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {books.map((book, i) => {
            const pct =
              book.totalPages > 0
                ? Math.round((book.currentPage / book.totalPages) * 100)
                : 0;
            return (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-5 relative group"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(28,33,64,0.85), rgba(20,24,44,0.9))",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${book.color}33`,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${book.color}15`,
                }}
              >
                {/* Book spine accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ background: book.color }}
                />

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} style={{ color: book.color }} />
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: `${STATUS_COLORS[book.status]}22`,
                        color: STATUS_COLORS[book.status],
                      }}
                    >
                      {STATUS_LABELS[book.status]}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      update(books.filter((b) => b.id !== book.id))
                    }
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#FF5A6A" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <h3 className="text-white font-bold text-sm mb-1 leading-tight">
                  {book.title}
                </h3>
                <p className="text-gray-500 text-xs mb-3">{book.author}</p>

                {book.status !== "wishlist" && (
                  <>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-gray-500 text-xs">Progress</span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: book.color }}
                      >
                        {pct}%
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden mb-2"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${book.color}, #4FE6FF)`,
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={book.currentPage}
                        onChange={(e) =>
                          updateProgress(
                            book.id,
                            Number.parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-20 px-2 py-1 rounded-lg text-white text-xs outline-none text-center"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      />
                      <span className="text-gray-600 text-xs">
                        / {book.totalPages} pages
                      </span>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {books.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-sm">
            No books added yet. Start your reading journey!
          </p>
        </div>
      )}
    </div>
  );
}
