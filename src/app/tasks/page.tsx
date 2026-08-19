"use client";

import { useCallback, useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TaskCard from "@/components/tasks/TaskCard";
import SearchBar from "@/components/tasks/SearchBar";
import FilterBar from "@/components/tasks/FilterBar";
import SortSelect from "@/components/tasks/SortSelect";
import useTasks from "@/hooks/useTasks";
import useDocumentTitle from "@/hooks/useDocumentTitle";

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
  useDocumentTitle("Tasks");

  const { tasks, setTasks, loading } = useTasks();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleDelete = useCallback(
    async (id: string) => {
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
    },
    [setTasks]
  );

  const filteredTasks = useMemo(() => {
    const searchText = search.toLowerCase();

    const result = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchText) ||
        task.subject.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "dueDate") {
        return (
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
        );
      }

      if (sortBy === "priority") {
        const priorityOrder: Record<string, number> = {
          high: 1,
          medium: 2,
          low: 3,
        };

        return (
          (priorityOrder[a.priority] ?? 99) -
          (priorityOrder[b.priority] ?? 99)
        );
      }

      if (sortBy === "oldest") {
        return a._id.localeCompare(b._id);
      }

      return b._id.localeCompare(a._id);
    });
  }, [tasks, search, statusFilter, sortBy]);

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

            <SortSelect
              value={sortBy}
              onChange={setSortBy}
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