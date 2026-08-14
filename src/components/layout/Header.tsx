export default function Header() {
  return (
    <header className="header">
      <div>
        <p className="headerLabel">Study Planner</p>
        <h1>Welcome back</h1>
      </div>

      <div className="headerActions">
        <button type="button">A+</button>
        <button type="button">Dark mode</button>
      </div>
    </header>
  );
}