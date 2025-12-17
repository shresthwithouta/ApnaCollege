"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import Button from "@/components/Button";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Registration failed");
      setLoading(false);
      return;
    }

    router.push("/login");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,var(--accent-soft),transparent_60%)] opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,var(--accent),transparent_65%)] opacity-30" />
      </div>

  
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <FloatingCard text="Create your public identity" style={{ left: "6%", top: "18%" }} />
        <FloatingCard text="Show skills with tags" style={{ right: "10%", top: "24%" }} />
        <FloatingCard text="Be discoverable" style={{ left: "18%", bottom: "26%" }} />
        <FloatingCard text="Join a real network" style={{ right: "14%", bottom: "30%" }} />
        <FloatingCard text="Build something meaningful" style={{ left: "38%", top: "8%" }} />
        <FloatingCard text="Start your journey" style={{ left: "42%", bottom: "10%" }} />
      </div>

  
      <div className="relative w-full max-w-md">
        <div className="card hover-card backdrop-blur-xl bg-[var(--card-bg)]/80 p-7 sm:p-8 transition-all duration-300">
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-extrabold">Create account</h1>
            <p className="muted mt-1">
              Start building something meaningful
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input className="input" placeholder="Full name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input pr-10"
                placeholder="Create password"
                value={password}
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

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button className="w-full flex items-center justify-center gap-2 btn-hover hover:gap-3">
              {loading ? "Creating…" : "Register"} <FiArrowRight />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm">
            <span className="muted">Already have an account?</span>{" "}
            <Link href="/login" className="link-hover font-medium">
              Login →
            </Link>
          </p>
        </div>
      </div>

     
      <style>{`
        .float {
          animation: float 16s ease-in-out infinite;
        }
        .float:hover {
          animation-play-state: paused;
        }
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(30px, -26px); }
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
