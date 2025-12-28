"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { IoSunny, IoMoon } from "react-icons/io5";
import {
  iconHover,
  tapScale,
  transitions,
  iconRotate,
} from "../../utils/animations";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    // Always set the theme in localStorage (even on first load)
    localStorage.setItem("theme", initialTheme);

    // Set the theme
    document.documentElement.setAttribute("data-theme", initialTheme);
    setIsDark(initialTheme === "dark");
  }, []);

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";

    // Update the theme
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  if (!mounted) {
    return (
      <div className="w-11 h-11 rounded-full flex items-center justify-center" />
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={iconHover}
      whileTap={tapScale}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className="btn btn-ghost btn-circle w-11 h-11 sm:w-12 sm:h-12 hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center p-0"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <motion.div
        animate={iconRotate(isDark ? 180 : 0)}
        transition={transitions.spring}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <IoMoon className="text-xl sm:text-2xl text-base-content" />
        ) : (
          <IoSunny className="text-xl sm:text-2xl text-base-content" />
        )}
      </motion.div>
    </motion.button>
  );
}
