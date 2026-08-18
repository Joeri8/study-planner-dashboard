"use client";

import { useSettings } from "@/context/SettingsContext";

export default function TextSizeToggle() {
  const { textSize, toggleTextSize } = useSettings();

  return (
    <button type="button" onClick={toggleTextSize}>
      {textSize === "normal" ? "A+" : "Normal text"}
    </button>
  );
}