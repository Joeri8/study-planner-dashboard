type SortSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortSelect({
  value,
  onChange,
}: SortSelectProps) {
  return (
    <div>
      <label htmlFor="sort-tasks">Sort tasks</label>

      <select
        id="sort-tasks"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="dueDate">Due date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}