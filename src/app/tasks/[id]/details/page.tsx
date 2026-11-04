"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import PageTitle from "@/components/common/PageTitle";
import Card from "@/components/common/Card";
import LinkButton from "@/components/common/LinkButton";

type Task = {
  _id: string;
  title: string;
  description: string;
  subject: string;
  priority: string;
  status: string;
  dueDate: string;
};

export default function TaskDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTask() {
      setLoading(true);
      setTask(null);
      setError("");

      try {
        const response = await fetch(`/api/tasks/${id}`);

        if (!response.ok) {
          setError(
            response.status === 404 ? "Task not found." : "Could not load task."
          );
          return;
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

  return (
    <div className="pageLayout">
      <Sidebar />

      <div className="pageContent">
        <Header />

        <main>
          <PageTitle title="Task details" />

          <Card>
            {loading && <p>Loading task...</p>}
            {error && <p>{error}</p>}

            {!loading && task && (
              <div>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p><strong>Subject:</strong> {task.subject}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p>
                  <strong>Due:</strong>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
                </p>
              </div>
            )}

            <LinkButton href="/tasks">Back to tasks</LinkButton>
          </Card>
        </main>
      </div>
    </div>
  );
}
