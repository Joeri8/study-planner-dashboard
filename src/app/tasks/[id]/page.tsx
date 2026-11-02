"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Button from "@/components/common/Button";
import PageTitle from "@/components/common/PageTitle";
import InputField from "@/components/common/InputField";

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
            <PageTitle title="Edit task" />

            <form onSubmit={handleSubmit}>
              <InputField
                id="title"
                label="Title"
                type="text"
                value={task.title}
                onChange={(value) => setTask({ ...task, title: value })}
                required
              />

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

              <InputField
                id="subject"
                label="Subject"
                type="text"
                value={task.subject}
                onChange={(value) => setTask({ ...task, subject: value })}
                required
              />

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

              <InputField
                id="dueDate"
                label="Due date"
                type="date"
                value={task.dueDate.slice(0, 10)}
                onChange={(value) => setTask({ ...task, dueDate: value })}
                required
              />

              {error && <p>{error}</p>}

              <Button type="submit">
                Save changes
              </Button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}