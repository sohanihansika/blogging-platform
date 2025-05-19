"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import classes from "./page.module.css";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    if (!email || !password) {
      setPending(false);
      setError("Please fill in all fields..");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setPending(false);
      setError("Please enter a valid email address..");
      return;
    }
    if (password.length < 6) {
      setPending(false);
      setError("Password must be at least 6 characters long..");
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      setPending(false);
      router.push("/posts/share");
    } else if (res?.status === 401) {
      setPending(false);
      setError("Invalid Credentials");
    } else {
      setPending(false);
      setError("Something went wrong.");
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
        {/* <img src="/logo1.png" alt="Blogify Logo" className={classes.logo} /> */}
        <h1>Log in to your account</h1>
        <p className={classes.subheading}>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </header>
      {error && <p className={classes.error}>{error}</p>}
      <main className={classes.main}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              disabled={pending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              disabled={pending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={classes.actions}>
            <button type="submit" disabled={pending}>
              Log In
            </button>
          </div>
        </form>
        <div className={classes.google}>
          <button disabled={false} onClick={(e) => handleProvider(e, "google")}>
            <img src="google2.png" alt="Google" className={classes.googleImg} />
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
