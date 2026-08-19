"use client";

import { useEffect } from "react";

// Ändrar titeln som visas i webbläsarfliken
export default function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | Study Planner`;
  }, [title]);
}