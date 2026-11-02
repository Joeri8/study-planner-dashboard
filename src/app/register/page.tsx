"use client";

import { useState } from "react";
import LinkButton from "@/components/common/LinkButton";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import PageTitle from "@/components/common/PageTitle";
import { useRouter } from "next/navigation";
import InputField from "@/components/common/InputField";

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
      <Card>
        <PageTitle
          title="Register"
          description="Create your Study Planner account."
        />

        <form onSubmit={handleSubmit}>
          <InputField
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={setName}
          />

          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          <Button type="submit">
            Create account
          </Button>
        </form>

        <LinkButton href="/login">
          Already have an account? Login
        </LinkButton>
      </Card>
    </main>
  );
}