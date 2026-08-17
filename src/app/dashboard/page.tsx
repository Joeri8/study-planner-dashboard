"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import PageTitle from "@/components/common/PageTitle";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

type Task = {
  _id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/api/tasks");

        if (!response.ok) {
          throw new Error("Could not fetch tasks");
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Could not fetch tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const remainingTasks = tasks.filter(
    (task) => task.status !== "completed"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high"
  ).length;

  return (
    <div className="pageLayout">
      <Sidebar />

      <div className="pageContent">
        <Header />

        <main>
          <PageTitle
            title="Dashboard"
            description="Overview of your study tasks."
          />

          <div className="dashboardCards">
            <Card>
              <h2>Total tasks</h2>
              <p className="statNumber">{totalTasks}</p>
            </Card>

            <Card>
              <h2>Completed</h2>
              <p className="statNumber">{completedTasks}</p>
            </Card>

            <Card>
              <h2>Remaining</h2>
              <p className="statNumber">{remainingTasks}</p>
            </Card>

            <Card>
              <h2>High priority</h2>
              <p className="statNumber">{highPriorityTasks}</p>
            </Card>
          </div>

          <Card>
            <h2>Your progress</h2>

            {totalTasks === 0 ? (
              <p>You have no tasks yet.</p>
            ) : completedTasks === totalTasks ? (
              <p>Everything is completed. Great job!</p>
            ) : highPriorityTasks >= 3 ? (
              <p>Several high priority tasks need attention.</p>
            ) : (
              <p>You are making progress.</p>
            )}

            <Button
              onClick={() => {
                window.location.href = "/tasks";
              }}
            >
              View tasks
            </Button>
          </Card>
        </main>
      </div>
    </div>
  );
}