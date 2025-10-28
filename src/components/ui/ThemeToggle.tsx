"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { IoSunny, IoMoon } from "react-icons/io5";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
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

    // Use setTimeout to avoid synchronous setState in effect
    setTimeout(() => {
      setIsDark(initialTheme === "dark");
    }, 0);
  }, []);

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";

    // Update the theme
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className="relative w-11 h-11 rounded-full flex items-center justify-center text-base-content transition-all duration-300 hover:backdrop-blur-lg hover:bg-base-content/10 hover:shadow-lg cursor-pointer active:bg-base-content/20"
      role="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <motion.div
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="text-lg"
      >
        {isDark ? (
          <IoMoon className="text-base-content" />
        ) : (
          <IoSunny className="text-base-content" />
        )}
      </motion.div>
    </motion.div>
  );
}
