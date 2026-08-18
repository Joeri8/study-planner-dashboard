"use client";

import { useSettings } from "@/context/SettingsContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useSettings();

  return (
    <button type="button" onClick={toggleTheme}>
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
}