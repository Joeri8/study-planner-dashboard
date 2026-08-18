"use client";

import TextSizeToggle from "@/components/common/TextSizeToggle";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Header() {
  return (
    <header className="header">
      <div>
        <p className="headerLabel">Study Planner</p>
        <h1>Welcome back</h1>
      </div>

      <div className="headerActions">
        <TextSizeToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}