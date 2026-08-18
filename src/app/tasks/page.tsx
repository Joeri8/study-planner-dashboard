"use client";

import { useCallback, useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TaskCard from "@/components/tasks/TaskCard";
import SearchBar from "@/components/tasks/SearchBar";
import FilterBar from "@/components/tasks/FilterBar";
import useTasks from "@/hooks/useTasks";

type Task = {
  _id: string;
  title: string;
  description: string;
  subject: string;
  priority: string;
  status: string;
  dueDate: string;
};

export default function TasksPage() {
  const { tasks, setTasks, loading } = useTasks();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  
  const handleDelete = useCallback(async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete task");
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.error("Could not delete task:", error);
    }
  }, []);

  const filteredTasks = useMemo(() => {
    const searchText = search.toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchText) ||
        task.subject.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, statusFilter]);

  return (
    <div className="pageLayout">
      <Sidebar />

      <div className="pageContent">
        <Header />

        <main>
          <section>
            <h1>Tasks</h1>
            <p>Manage your study tasks and deadlines.</p>

            <SearchBar
              value={search}
              onChange={setSearch}
            />

            <FilterBar
              value={statusFilter}
              onChange={setStatusFilter}
            />

            {loading && <p>Loading tasks...</p>}

            {!loading && tasks.length === 0 && (
              <p>No tasks found.</p>
            )}

            {!loading &&
              tasks.length > 0 &&
              filteredTasks.length === 0 && (
                <p>No tasks match your search or filter.</p>
              )}

            {!loading &&
              filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                />
              ))}
          </section>
        </main>
      </div>
    </div>
  );
}