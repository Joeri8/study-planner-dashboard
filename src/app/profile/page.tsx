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
  const [avatar, setAvatar] = useState("");
  const [readingImage, setReadingImage] = useState(false);
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
        setAvatar(data.avatar || "");
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

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMessage("Choose a JPG, PNG or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      setMessage("The image must be smaller than 1 MB.");
      event.target.value = "";
      return;
    }

    setMessage("");
    setReadingImage(true);

    // FileReader gor bilden till text som kan skickas till backend.
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result as string);
      setReadingImage(false);
    };
    reader.onerror = () => {
      setMessage("Could not read image. Please try again.");
      setReadingImage(false);
    };
    reader.readAsDataURL(file);
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving || readingImage) {
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
        body: JSON.stringify({ name, email, avatar }),
      });
      const data = await response.json();

      if (response.ok) {
        setName(data.name);
        setEmail(data.email);
        setAvatar(data.avatar || "");
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
                <div>
                  <label htmlFor="avatar">Avatar</label>
                  {avatar && (
                    // Vanlig img anvands eftersom bilden ar en data-URL.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatar}
                      alt="Your avatar"
                      width={100}
                      height={100}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  )}
                  <input
                    id="avatar"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarChange}
                    disabled={readingImage || saving}
                    aria-describedby="avatarHelp"
                  />
                  <p id="avatarHelp">JPG, PNG or WebP, maximum 1 MB. Click Save profile to save.</p>
                  {readingImage && <p>Reading image...</p>}
                </div>

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