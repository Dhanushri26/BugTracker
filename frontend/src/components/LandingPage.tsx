/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Users, Zap, Shield } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
const [name, setName] = useState("");

const handleAuth = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    let res;
    let data;

    if (mode === "login") {
      res = await fetch(
        `http://localhost:3000/users/${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error("User not found");
      }

      data = await res.json();

      if (data.password !== password) {
        throw new Error("Invalid credentials");
      }

    } else {
      // ✅ SIGN UP
      res = await fetch("http://localhost:3000/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      data = await res.json();
    }

    console.log(`${mode} success`, data);
    onGetStarted();

  } catch (err: any) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);
  //   console.log(name);
  //   console.log(email);
  //   console.log(password);

  //   try {
  //     const res = await fetch("http://localhost:3000/users/create", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name,email, password }),
  //     });

  //     if (!res.ok) {
  //       throw new Error("Invalid credentials");
  //     }

  //     const data = await res.json();
  //     console.log("Login success:", data);

  //     // store token if needed
  //     // localStorage.setItem("token", data.token);

  //     onGetStarted();
  //   } catch (err: any) {
  //     setError(err.message || "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

 return (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* LEFT: HERO */}
      <div>
        <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
          Track Bugs with
          <span className="text-primary-600 block">Precision & Ease</span>
        </h2>

        <p className="text-xl text-neutral-600 mb-10">
          Organize, prioritize, and kill bugs faster with a tracker that
          actually respects your time.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Feature
            icon={<Zap className="h-6 w-6 text-info-600" />}
            title="Fast"
            desc="Log bugs in seconds. No nonsense."
          />
          <Feature
            icon={<Users className="h-6 w-6 text-success-600" />}
            title="Collaborative"
            desc="Your whole team, synced."
          />
          <Feature
            icon={<Shield className="h-6 w-6 text-primary-600" />}
            title="Secure"
            desc="Your data stays locked."
          />
        </div>
      </div>

      {/* RIGHT: LOGIN */}
     <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200 w-full max-w-lg">

  {/* TOGGLE */}
  <div className="flex bg-neutral-100 rounded-lg p-1 mb-6">
    <button
      onClick={() => setMode("login")}
      className={`flex-1 py-2 text-sm font-semibold rounded-md transition
        ${mode === "login"
          ? "bg-white shadow text-primary-600"
          : "text-neutral-500"}`}
    >
      Login
    </button>
    <button
      onClick={() => setMode("signup")}
      className={`flex-1 py-2 text-sm font-semibold rounded-md transition
        ${mode === "signup"
          ? "bg-white shadow text-primary-600"
          : "text-neutral-500"}`}
    >
      Sign Up
    </button>
  </div>

  <h3 className="text-2xl font-semibold text-neutral-900 mb-6 text-center">
    {mode === "login" ? "Welcome back" : "Create your account"}
  </h3>

  <form onSubmit={handleAuth} className="space-y-5">

    {mode === "signup" && (
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:ring-2 focus:ring-primary-500"
          placeholder="Your name"
        />
      </div>
    )}

    <div>
      <label className="block text-sm font-medium text-neutral-700">
        Email
      </label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:ring-2 focus:ring-primary-500"
        placeholder="you@example.com"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-neutral-700">
        Password
      </label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:ring-2 focus:ring-primary-500"
        placeholder="••••••••"
      />
    </div>

    {error && <p className="text-sm text-red-600">{error}</p>}

    <button
      type="submit"
      disabled={loading}
      className="w-full btn-primary py-2 font-semibold disabled:opacity-60"
    >
      {loading
        ? mode === "login"
          ? "Logging in..."
          : "Creating account..."
        : mode === "login"
        ? "Login"
        : "Sign Up"}
    </button>
  </form>

  <p className="text-sm text-neutral-500 mt-4 text-center">
    {mode === "login"
      ? "New here? Switch to Sign Up"
      : "Already have an account? Switch to Login"}
  </p>
</div>


    </div>
  </div>
);

}

/* Small Feature Component */
function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-4 rounded-xl border border-neutral-200 bg-white">
      <div className="mb-2">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-neutral-600">{desc}</p>
    </div>
  );
}
