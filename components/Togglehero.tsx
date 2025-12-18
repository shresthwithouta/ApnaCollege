"use client";

import "buffer";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function ToggleHero() {
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
    <div className="flex h-12 w-24 fixed -translate-x-20 -translate-y-5 rounded-full drop-shadow-gray-800 shadow-xl/70 border-amber-50 border-4 bg-[] justify-center items-center gap-1">
        <button
        onClick={setDark}
        className="flex items-center z-5 rounded-full justify-center"
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
