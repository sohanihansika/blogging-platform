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
  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();

  const validateForm = () => {
    const validationErrors: string[] = [];

    if (!form.name.trim()) validationErrors.push("Name is required.");
    if (!form.email.trim()) validationErrors.push("Email is required.");
    if (!form.password) validationErrors.push("Password is required.");
    if (!form.confirmPassword)
      validationErrors.push("Confirm Password is required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      validationErrors.push("Please enter a valid email address.");
    }

    if (form.password && form.password.length < 6) {
      validationErrors.push("Password must be at least 6 characters long.");
    }

    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      validationErrors.push("Passwords do not match.");
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors([validationErrors[0]]);
      return;
    }

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
      setErrors([data.message]);
    }
  };

  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(value, {
      callbackUrl: "/posts/share",
    });
  };

  return (
    <>
      <header className={classes.header}>
        <h1>Create an account</h1>
        <p className={classes.subheading}>
          Already have an account? <a href="/signin">Log in</a>
        </p>
      </header>

      {/* {errors && <p className={classes.error}>{errors}</p>} */}

      {errors.length > 0 && (
        <ul className={classes.errorList}>
          {errors.map((err, index) => (
            <li key={index} className={classes.error}>
              {err}
            </li>
          ))}
        </ul>
      )}

      <main className={classes.main}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              disabled={pending}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              disabled={pending}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              disabled={pending}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div>
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
          </div>

          <div className={classes.actions}>
            <button type="submit" disabled={pending}>
              {pending ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className={classes.google}>
          <button
            disabled={pending}
            onClick={(e) => handleProvider(e, "google")}
          >
            <img src="google2.png" alt="Google" className={classes.googleImg} />
            Continue with Google
          </button>
        </div>

        <div className={classes.google}>
          <button
            disabled={pending}
            onClick={(e) => handleProvider(e, "github")}
          >
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
