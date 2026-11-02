"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Button from "@/components/common/Button";
import PageTitle from "@/components/common/PageTitle";
import InputField from "@/components/common/InputField";

export default function NewTaskPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          subject,
          priority,
          status,
          dueDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not create task");
      }

      router.push("/tasks");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Could not create task. Please try again.");
    }
  }

  return (
    <div className="pageLayout">
      <Sidebar />

      <div className="pageContent">
        <Header />

        <main>
          <section>
            <PageTitle title="Create new task" description="Add a new study task." />

            <form onSubmit={handleSubmit}>
              <InputField
                id="title"
                label="Title"
                type="text"
                value={title}
                onChange={setTitle}
                required
              />

              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

              <InputField
                id="subject"
                label="Subject"
                type="text"
                value={subject}
                onChange={setSubject}
                required
              />

              <div>
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
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
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
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
                value={dueDate}
                onChange={setDueDate}
                required
              />

              {error && <p>{error}</p>}

              <Button type="submit">Create task</Button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}