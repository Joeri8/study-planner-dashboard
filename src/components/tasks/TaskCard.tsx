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
      <h2>
        <Link href={`/tasks/${task._id}/details`}>
          {task.title}
        </Link>
      </h2>

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
