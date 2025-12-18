"use client";

import "buffer";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  function setDark() {
    if (isDark) return;
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setIsDark(true);
  }

  function setLight() {
    if (!isDark) return; 
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    setIsDark(false);
  }

  return (
    <div className="flex gap-8 h-8 items-center relative">
     
      <div
        className={`
          bg-[#242424]
          z-4
          h-11
          w-11
          fixed
          rounded-full
          transition-transform
          duration-700
          ease-out
          ${isDark ? "translate-x-15 bg-[#ffffff]" : "-translate-x-3"}
        `}
      />

      <button
        onClick={setDark}
        className="flex items-center z-5 rounded-full justify-center gap-8"
        aria-label="Dark mode"
      >
        <FiMoon className="-translate-x-1" size={30} color="#ffffff" />
      </button>

      <button
        onClick={setLight}
        className="flex items-center z-5 justify-center gap-8"
        aria-label="Light mode"
      >
        <FiSun className="translate-x-1.25 " size={30} color={isDark ? "242424" : "#242424"} />
      </button>
    </div>
  );
}
