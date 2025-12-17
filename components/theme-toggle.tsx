"use client";

import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <FiMoon className="block dark:hidden" size={18} />
      <FiSun className="hidden dark:block" size={18} />
    </button>
  );
}
