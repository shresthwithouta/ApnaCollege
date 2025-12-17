"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "./theme-toggle";
import PageHeader from "./PageHeader";
import MobileNav from "./MobileNav";
import Link from "next/link";

export default function AppShell({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)]">
     
      <div className="sticky top-4 z-50 px-4">
        <header
          className="
            mx-auto max-w-3xl
            rounded-full
            border border-[var(--border-soft)]
            bg-[var(--card-bg)]/60
            backdrop-blur-xl
            shadow-lg
            relative
          "
        >
         
          <div className="pointer-events-none outline-2 hover:animate-pulse absolute inset-0 rounded-full animate-headerGlow animate" />

          
          <div className="relative grid grid-cols-5 items-center h-16 px-4">
            
            <div className="flex justify-center">
              {session?.user?.role && (
                <Pill>
                  <span className="text-lg font-semibold truncate max-w-[90px]">
                    {session.user.role}
                  </span>
                </Pill>
              )}
            </div>

           
            <div className="flex justify-center">
              {session?.user?.name && (
                <Link
                href="/profile"
                >

                <Pill>
                  <span className="text-lg font-semibold hover:text-shadow-blue-100 text-shadow-2xl truncate max-w-[90px]">
                    {session.user.name}
                  </span>
                </Pill>
              </Link>
              )}
            </div>
            
            <div className="flex justify-center">
              <Link
                href="/dashboard"
                className="text-lg font-bold mt-4 ml-5 hover:text-shadow-lg h-4 tracking-wide"
              >
                Apna College
              </Link>
            </div>

           
            <div className="flex h-12 ml-4 justify-center">
              <Pill>
                <ThemeToggle />
              </Pill>
            </div>

            <div className="flex justify-center ml-12  w-12 h-12">
              {session && (
                <Pill>
                  <LogoutButton />
                </Pill>
              )}
            </div>
          </div>
        </header>
      </div>

      <div className="flex flex-1 w-full container mx-auto px-4">
        <aside className="hidden md:block w-60 pr-6 pt-6">
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24 md:pb-8">
          <div className="mb-4">
            <PageHeader />
          </div>

          <div className="animate-fadeIn">
            {children}
          </div>
        </main>
      </div>

      <MobileNav />

      <style>{`
        @keyframes headerGlow {
          0% { box-shadow: 0 0 0 0 rgba(103,111,83,0.25); }
          50% { box-shadow: 0 0 0 2px rgba(103,111,83,0.45); }
          100% { box-shadow: 0 0 0 0 rgba(103,111,83,0.25); }
        }
        .animate-headerGlow {
          animation: headerGlow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}


function Pill({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        px-3 py-1.5
        rounded-full
        border border-[var(--border-soft)]
        bg-[var(--card-bg)]/70
        backdrop-blur-md
        shadow-sm
        flex items-center justify-center
        hover:shadow-md
        transition
      "
    >
      {children}
    </div>
  );
}
