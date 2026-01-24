"use client";

import { useCallback, useRef } from "react";

export function useSound(soundFile: string, volume: number = 0.5) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on first use
  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundFile);
      audioRef.current.volume = volume;
    }

    // Reset and play
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
      console.log("Audio play failed:", err);
    });
  }, [soundFile, volume]);

  return play;
}
