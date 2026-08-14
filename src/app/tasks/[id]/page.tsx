"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

type Task = {
  _id: string;
  title: string;
  description: string;
  subject: string;
  priority: string;
  status: string;
  dueDate: string;
};

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await fetch(`/api/tasks/${id}`);

        if (!response.ok) {
          throw new Error("Could not fetch task");
        }

        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error(error);
        setError("Could not load task.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchTask();
    }
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!task) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Could not update task");
      }

      router.push("/tasks");
    } catch (error) {
      console.error(error);
      setError("Could not update task.");
    }
  }

  if (loading) {
    return <p>Loading task...</p>;
  }

  if (!task) {
    return <p>{error || "Task not found."}</p>;
  }

  return (
    <div className="pageLayout">
      <Sidebar />

      <div className="pageContent">
        <Header />

        <main>
          <section>
            <h1>Edit task</h1>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={task.title}
                  onChange={(event) =>
                    setTask({
                      ...task,
                      title: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={task.description}
                  onChange={(event) =>
                    setTask({
                      ...task,
                      description: event.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={task.subject}
                  onChange={(event) =>
                    setTask({
                      ...task,
                      subject: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  value={task.priority}
                  onChange={(event) =>
                    setTask({
                      ...task,
                      priority: event.target.value,
                    })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={task.status}
                  onChange={(event) =>
                    setTask({
                      ...task,
                      status: event.target.value,
                    })
                  }
                >
                  <option value="todo">To do</option>
                  <option value="in-progress">In progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label htmlFor="dueDate">Due date</label>
                <input
                  id="dueDate"
                  type="date"
                  value={task.dueDate.slice(0, 10)}
                  onChange={(event) =>
                    setTask({
                      ...task,
                      dueDate: event.target.value,
                    })
                  }
                  required
                />
              </div>

              {error && <p>{error}</p>}

              <button type="submit">
                Save changes
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}