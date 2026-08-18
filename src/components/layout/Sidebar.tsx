"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
  }

  return (
    <aside className="sidebar">
      <div>
        <h2 className="logo">Study Planner</h2>

        <nav aria-label="Main navigation">
          <ul className="navList">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/tasks">Tasks</Link>
            </li>
            <li>
              <Link href="/tasks/new">New task</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>

      <button
        type="button"
        className="logoutButton"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}