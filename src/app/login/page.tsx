"use client";

import { useState } from "react";
import LinkButton from "@/components/common/LinkButton";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import PageTitle from "@/components/common/PageTitle";
import { useRouter } from "next/navigation";
import InputField from "@/components/common/InputField";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (data.success) {
      router.push("/dashboard");

    } else {
      alert(data.message);
    }
  }


  return (
    <main>
      <Card>
        <PageTitle
          title="Login"
          description="Log in to your Study Planner."
        />

        <form onSubmit={handleSubmit}>
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
            Log in
          </Button>
        </form>

        <LinkButton href="/register">
          Register now
        </LinkButton>
      </Card>
    </main>
  );
}