type FilterBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function FilterBar({
  value,
  onChange,
}: FilterBarProps) {
  return (
    <div>
      <label htmlFor="status-filter">Filter by status</label>

      <select
        id="status-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="all">All tasks</option>
        <option value="todo">To do</option>
        <option value="in-progress">In progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}