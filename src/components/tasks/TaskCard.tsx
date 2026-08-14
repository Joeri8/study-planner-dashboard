"use client";

import Link from "next/link";

type Task = {
  _id: string;
  title: string;
  description: string;
  subject: string;
  priority: string;
  status: string;
  dueDate: string;
};

type TaskCardProps = {
  task: Task;
  onDelete: (id: string) => void;
};

export default function TaskCard({
  task,
  onDelete,
}: TaskCardProps) {
  return (
    <article className="taskCard">
      <h2>{task.title}</h2>

      <p>{task.description}</p>

      <p>
        <strong>Subject:</strong> {task.subject}
      </p>

      <p>
        <strong>Priority:</strong> {task.priority}
      </p>

      <p>
        <strong>Status:</strong> {task.status}
      </p>

      <p>
        <strong>Due:</strong>{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No due date"}
      </p>

      <div className="taskActions">
        <Link href={`/tasks/${task._id}`}>
          Edit
        </Link>

        <button
          type="button"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}