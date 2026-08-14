import Link from "next/link";

export default function Sidebar() {
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

      <button type="button" className="logoutButton">
        Logout
      </button>
    </aside>
  );
}