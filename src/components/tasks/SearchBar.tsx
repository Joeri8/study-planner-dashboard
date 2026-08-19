"use client";

import { useRef } from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
 
  // Referens till sökfältet så vi kan sätta fokus på det.
  const inputRef = useRef<HTMLInputElement>(null);

  function focusSearch() {
    inputRef.current?.focus();
  }

  return (
    <div>
      <label htmlFor="task-search">Search tasks</label>

      <input
        ref={inputRef}
        id="task-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by title or subject"
      />

      <button type="button" onClick={focusSearch}>
        Focus search
      </button>
    </div>
  );
}