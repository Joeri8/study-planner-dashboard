"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import PageTitle from "@/components/common/PageTitle";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
        router.push("/login");
        } else {
        alert(data.message);
        }

        console.log(data);
  }

  return (
    <main>
      <div>
        <PageTitle
          title="Register"
          description="Create your Study Planner account."
        />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <Button type="submit">
            Create account
          </Button>
        </form>

        <Link href="/login">
          Already have an account? Login
        </Link>
      </div>
    </main>
  );
}