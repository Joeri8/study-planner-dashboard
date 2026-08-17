type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div>
      <label htmlFor="task-search">Search tasks</label>

      <input
        id="task-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by title or subject"
      />
    </div>
  );
}