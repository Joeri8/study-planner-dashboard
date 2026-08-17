"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import PageTitle from "@/components/common/PageTitle";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

export default function ProfilePage() {
  const [name, setName] = useState("Student User");
  const [email, setEmail] = useState("student@example.com");
  const [message, setMessage] = useState("");

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("Profile saved!");
  }

  return (
    <div className="pageLayout">
      <Sidebar />

      <div className="pageContent">
        <Header />

        <main>
          <PageTitle
            title="Profile"
            description="Manage your profile information."
          />

          <Card>
            <form onSubmit={handleSave}>
              <div>
                <label htmlFor="name">Name</label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <Button type="submit">
                Save profile
              </Button>

              {message && <p>{message}</p>}
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
}