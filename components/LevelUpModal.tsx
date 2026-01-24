"use client";

import { SOUND_PATHS } from "@/lib/enums";
import { useSound } from "@/lib/useSound";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { IoSparklesSharp } from "react-icons/io5";

type LevelUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  level: number;
};

export default function LevelUpModal({
  isOpen,
  onClose,
  level,
}: LevelUpModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  const playSound = useSound(SOUND_PATHS.LEVEL_UP, 0.18);
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      playSound();
      // Auto-close after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100"
            onClick={onClose}
          />

          {/* Confetti Background */}
          {showConfetti && (
            <div className="fixed inset-0 z-101 pointer-events-none overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    top: "-10%",
                    left: `${Math.random() * 100}%`,
                    rotate: 0,
                  }}
                  animate={{
                    top: "110%",
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                    ease: "linear",
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: [
                      "#3B82F6",
                      "#8B5CF6",
                      "#EC4899",
                      "#F59E0B",
                      "#10B981",
                    ][Math.floor(Math.random() * 5)],
                  }}
                />
              ))}
            </div>
          )}

          {/* Level Up Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-102"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-center min-w-[320px]">
              {/* Sparkle Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                className="mb-6 flex justify-center"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-linear-to-br from-primary to-blue-700 rounded-full flex items-center justify-center">
                    <IoSparklesSharp className="w-10 h-10 text-white" />
                  </div>

                  {/* Pulsing rings */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 bg-blue-500 rounded-full"
                  />
                </div>
              </motion.div>

              {/* Text */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                Level Up! 🎉
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-4"
              >
                <p className="text-gray-600 mb-2">You've reached</p>
                <div className="text-6xl font-bold bg-linear-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                  Level {level}
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 text-sm"
              >
                Keep up the great work! 💪
              </motion.p>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-linear-to-r bg-primary text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
