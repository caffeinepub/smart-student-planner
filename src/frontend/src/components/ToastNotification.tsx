import { AlertCircle, Bell, CheckCircle, Gift, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

export type ToastType = "info" | "success" | "warning" | "birthday";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
}

let addToastFn: ((toast: Omit<Toast, "id">) => void) | null = null;

export function addToast(toast: Omit<Toast, "id">) {
  if (addToastFn) addToastFn(toast);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    addToastFn = (toast) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => removeToast(id), 5000);
    };
    return () => {
      addToastFn = null;
    };
  }, [removeToast]);

  const icons: Record<ToastType, React.ReactNode> = {
    info: <Bell size={16} className="text-cyan-400" />,
    success: <CheckCircle size={16} className="text-green-400" />,
    warning: <AlertCircle size={16} className="text-amber-400" />,
    birthday: <Gift size={16} className="text-pink-400" />,
  };

  const colors: Record<ToastType, string> = {
    info: "#4FE6FF",
    success: "#4BE38A",
    warning: "#FFB84A",
    birthday: "#C65BFF",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative rounded-xl p-4 pr-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(28,33,64,0.95), rgba(20,24,44,0.98))",
              backdropFilter: "blur(20px)",
              border: `1px solid ${colors[toast.type]}33`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${colors[toast.type]}22`,
            }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{icons[toast.type]}</div>
              <div>
                {toast.title && (
                  <p className="text-white text-sm font-semibold mb-0.5">
                    {toast.title}
                  </p>
                )}
                <p className="text-gray-300 text-sm">{toast.message}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
