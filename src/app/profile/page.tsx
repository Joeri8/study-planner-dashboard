"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import PageTitle from "@/components/common/PageTitle";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/profile");
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message);
          return;
        }

        setName(data.name);
        setEmail(data.email);
        setProfileLoaded(true);
      } catch (error) {
        console.error(error);
        setMessage("Could not load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();

      if (response.ok) {
        setName(data.name);
        setEmail(data.email);
      }

      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage("Could not save profile. Please try again.");
    } finally {
      setSaving(false);
    }
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
            {loading && <p>Loading profile...</p>}

            {profileLoaded && (
              <form onSubmit={handleSave}>
                <InputField
                  id="name"
                  label="Name"
                  type="text"
                  value={name}
                  onChange={setName}
                  required
                />

                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  required
                />

                <Button type="submit">
                  {saving ? "Saving..." : "Save profile"}
                </Button>

              </form>
            )}

            {message && <p aria-live="polite">{message}</p>}
          </Card>
        </main>
      </div>
    </div>
  );
}