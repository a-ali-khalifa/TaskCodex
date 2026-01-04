import { DIFFICULTIES } from "@/lib/enums";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FiDelete, FiZap } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export function AddTask({
  isOpen,
  onClose,
  onCreateTask,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (title: string, difficulty: keyof typeof DIFFICULTIES) => void;
}) {
  const [title, setTitle] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<keyof typeof DIFFICULTIES>("MEDIUM");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ========================================
  // EFFECTS
  // ========================================
  // Auto-focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Typing indicator animation trigger
  useEffect(() => {
    if (title.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    }
  }, [title]);

  // ========================================
  // EVENT HANDLERS
  // ========================================
  // Submit handler - creates the task
  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreateTask(title, selectedDifficulty);
    setTitle("");
    setSelectedDifficulty("MEDIUM");
    onClose();
  };

  // Keyboard shortcuts handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Enter" && title.trim()) {
      handleSubmit();
    }
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ===== BACKDROP ===== */}
          {/* Semi-transparent overlay with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 font-rubik"
          />

          {/* ===== MAIN BUBBLE CONTAINER ===== */}
          {/* Animated floating card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* ===== HEADER SECTION ===== */}
              {/* Gradient header with title and close button */}
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    New Task
                  </h3>
                </div>
                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                >
                  <IoClose className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* ===== CONTENT SECTION ===== */}
              <div className="p-6">
                {/* ===== TASK TITLE INPUT ===== */}
                {/* Main input field with typing indicator */}
                <div className="relative mb-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What needs to be done?"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                  />

                  {/* ===== TYPING INDICATOR ===== */}
                  {/* Three animated dots that appear while typing */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1"
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                            className="w-2 h-2 bg-primary rounded-full"
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ===== CHARACTER COUNT ===== */}
                {/* Shows number of characters typed */}
                {title.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-gray-500 mb-4"
                  >
                    {title.length} characters
                  </motion.p>
                )}

                {/* ===== DIFFICULTY SELECTOR ===== */}
                {/* Three buttons for Easy/Medium/Hard with XP values */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Difficulty
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(DIFFICULTIES).map(([key, diff]) => {
                      const isSelected = selectedDifficulty === key;
                      return (
                        <motion.button
                          key={key}
                          type="button"
                          onClick={() => {
                            setSelectedDifficulty(
                              key as keyof typeof DIFFICULTIES
                            );
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            backgroundColor: isSelected
                              ? diff.background
                              : "transparent",
                            color: isSelected ? diff.color : "#6B7280",
                            borderColor: isSelected ? diff.color : "#D1D5DB",
                          }}
                          className="relative px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <FiZap className="w-4 h-4" />
                            <span>{diff.label}</span>
                            <span className="text-xs opacity-80">
                              {diff.xp} XP
                            </span>
                          </div>

                          {/* Animated border that follows selection */}
                          {isSelected && (
                            <motion.div
                              layoutId="difficulty-indicator"
                              className="absolute inset-0 border-2 rounded-xl pointer-events-none"
                              style={{ borderColor: diff.color }}
                              transition={{
                                type: "spring",
                                damping: 20,
                                stiffness: 300,
                              }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {title.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200"
                  >
                    <p className="text-xs font-medium text-gray-500 mb-2">
                      Preview:
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-medium text-gray-900">
                        {title}
                      </p>
                      <div
                        style={{
                          backgroundColor:
                            DIFFICULTIES[selectedDifficulty].background,
                          color: DIFFICULTIES[selectedDifficulty].color,
                        }}
                        className="px-3 py-1 rounded-lg text-sm font-semibold"
                      >
                        {DIFFICULTIES[selectedDifficulty].label} •{" "}
                        {DIFFICULTIES[selectedDifficulty].xp} XP
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!title.trim()}
                    whileHover={{ scale: title.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: title.trim() ? 0.98 : 1 }}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Create Task
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
