import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    
    <div className="min-h-screen transition-all duration-700 ease-in-out">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* TOP BAR */}
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            Identity
          </h1>
          <ThemeToggle />
        </div>

       
        <section className="grid gap-10 lg:grid-cols-2">
          
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Build your identity.
              <span className="block text-[var(--accent)]">
                Explore others.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-lg muted">
              Create public profiles, organize skills with tags,
              explore users, and manage everything from one
              powerful dashboard.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/register" className="btn btn-hover px-6 py-3">
                Get started
              </Link>

              <Link href="/login" className="btn-ghost btn-hover px-6 py-3">
                Login
              </Link>

              <Link
                href="/explore"
                className="link-hover text-sm font-semibold"
              >
                Explore users →
              </Link>
            </div>
          </div>

         
          <div className="grid grid-cols-2 gap-4">
            <div className="card hover-card transition-all duration-300">
              <p className="text-sm muted">Profiles</p>
              <p className="mt-2 text-2xl font-semibold">
                Public & Shareable
              </p>
            </div>

            <div className="card hover-card transition-all duration-300">
              <p className="text-sm muted">Tags</p>
              <p className="mt-2 text-2xl font-semibold">
                Skills & Roles
              </p>
            </div>

            <div className="card hover-card col-span-2 transition-all duration-300">
              <p className="text-sm muted">Control</p>
              <p className="mt-2 text-2xl font-semibold">
                Admin tools, audit logs, permissions
              </p>
            </div>
          </div>
        </section>

       
        <section className="mt-18">
          <div className="mb-6 max-w-2xl">
            <h3 className="text-2xl font-semibold">
              Everything you need
            </h3>
            <p className="mt-2 muted">
              Designed to scale from individuals to admins.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Feature title="Public Profiles" desc="Clean identity pages with tags and bio." />
            <Feature title="Explore & Search" desc="Discover users instantly." />
            <Feature title="Tag System" desc="Organize skills and interests." />
            <Feature title="Admin Controls" desc="Roles, permissions, and moderation." />
            <Feature title="Audit Logs" desc="Every action is tracked." />
            <Feature title="Unified Dashboard" desc="All data in one place." />
          </div>
        </section>
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card hover-card transition-all duration-300">
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-1 text-sm muted">{desc}</p>
    </div>
  );
}
