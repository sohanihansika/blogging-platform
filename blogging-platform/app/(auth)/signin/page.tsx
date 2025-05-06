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
        <h1>Log in to your account</h1>
        <p className={classes.subheading}>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </header>
      {error && <p className={classes.error}>{error}</p>}
      <main className={classes.main}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              disabled={pending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </p>

          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              disabled={pending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </p>

          <p className={classes.actions}>
            <button type="submit" disabled={pending}>
              Log In
            </button>
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
