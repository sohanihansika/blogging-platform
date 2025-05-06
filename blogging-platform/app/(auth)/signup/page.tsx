"use client";

import classes from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      setPending(false);
      router.push("/posts/share");
    } else {
      setPending(false);
      setError(data.message);
    }
  };

  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google",
  ) => {
    event.preventDefault();
    signIn(value, {
      callbackUrl: "/posts/share",
    });
  };

  return (
    <>
      <header className={classes.header}>
        {/* <img src="/logo1.png" alt="Blogify Logo" className={classes.logo} /> */}
        <h1>Create an account</h1>
        <p className={classes.subheading}>
          Already have an account? <a href="/signin">Log in</a>
        </p>
      </header>
      {error && <p className={classes.error}>{error}</p>}
      <main className={classes.main}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              disabled={pending}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </p>

          <p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              disabled={pending}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </p>

          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              disabled={pending}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </p>

          <p>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              disabled={pending}
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
          </p>

          <p className={classes.actions}>
            <button type="submit">Sign Up</button>
          </p>
        </form>
        <div className={classes.google}>
          <button disabled={false} onClick={(e) => handleProvider(e, "google")}>
            <img
              src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
              alt="Google"
              className={classes.googleImg}
            />
            Continue with Google
          </button>
        </div>
        <div className={classes.google}>
          <button disabled={false} onClick={(e) => handleProvider(e, "github")}>
            <img
              src="github-mark-white.png"
              alt="GitHub"
              className={classes.googleImg}
            />
            Continue with GitHub
          </button>
        </div>
      </main>
    </>
  );
}
