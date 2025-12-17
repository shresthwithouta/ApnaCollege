"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import Button from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email: emailOrUsername,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--accent-soft),transparent_60%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--accent),transparent_65%)] opacity-25" />
      </div>

     
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <FloatingCard text="Your public profile" style={{ left: "8%", top: "18%" }} />
        <FloatingCard text="Tags that define you" style={{ right: "10%", top: "22%" }} />
        <FloatingCard text="Explore real users" style={{ left: "14%", bottom: "28%" }} />
        <FloatingCard text="Admin-grade dashboard" style={{ right: "12%", bottom: "30%" }} />
        <FloatingCard text="Audit & control" style={{ left: "40%", top: "8%" }} />
        <FloatingCard text="Everything in one place" style={{ left: "38%", bottom: "10%" }} />
      </div>

     
      <div className="relative w-full max-w-md">
        <div className="card hover-card backdrop-blur-xl bg-[var(--card-bg)]/80 p-7 sm:p-8 transition-all duration-300">
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-extrabold">Login</h1>
            <p className="muted mt-1">
              Welcome back. Continue where you left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Email / Username</label>
              <input
                className="input mt-1 focus:ring-2 focus:ring-[var(--accent)]"
                value={emailOrUsername}
                placeholder="Enter your Email or Username"
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input pr-10 focus:ring-2 focus:ring-[var(--accent)]"
                  value={password}
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--accent)] transition"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button className="w-full flex items-center justify-center gap-2 btn-hover hover:gap-3">
              {loading ? "Logging in…" : "Login"} <FiArrowRight />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm">
            <span className="muted">New here?</span>{" "}
            <Link href="/register" className="link-hover font-medium">
              Create account →
            </Link>
          </p>
        </div>
      </div>

     
      <style>{`
        .float {
          animation: float 18s ease-in-out infinite;
        }
        .float:hover {
          animation-play-state: paused;
        }
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(28px, -24px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}

function FloatingCard({
  text,
  style,
}: {
  text: string;
  style: React.CSSProperties;
}) {
  return (
    <div className="absolute float" style={style}>
      <div
        className="
          pointer-events-auto
          rounded-2xl px-7 py-4
          text-base font-semibold
          backdrop-blur-xl
          bg-[var(--card-bg)]/70
          border border-[var(--border-soft)]
          shadow-xl
          transition-all duration-300
          hover:scale-105 hover:shadow-2xl
        "
      >
        {text}
      </div>
    </div>
  );
}
