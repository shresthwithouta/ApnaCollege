"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "./theme-toggle";
import PageHeader from "./PageHeader";
import MobileNav from "./MobileNav";
import Link from "next/link";
import Image from "next/image";

export default function AppShell({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const hidePageHeader = pathname === "/profile";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="sticky top-4 z-50 px-4">
        <div className="items-center z-51 ml-165 hidden md:fixed md:block -mt-4 h-full justify-center">
              <Link
                href="/dashboard"
                className="text-xl font-bold tracking-wide"
              >
                <Image
      src="/icon.png"
      width={160}
      height={50}
      alt="Picture of the author"
    />
              </Link>
            </div>
        <header
          className="
            mx-auto max-w-3xl
            rounded-full
            border border-[var(--border-soft)]
            bg-[var(--card-bg)]/60
            backdrop-blur-xl
            drop-shadow-orange-800
            relative
          "
        >
          <div className="pointer-events-none absolute inset-0 rounded-full animate-headerGlow" />

          {/* MOBILE HEADER */}
          <div className="md:hidden flex gap-2 p-1 ml-2 justify-center items-center h-14">
            <div className="flex mt-3 -ml-2">
              {session?.user?.name && (
                <Link href="/profile">
                  <Pill>
                    <span className="text-sm font-semibold truncate max-w-[90px]">
                      {session.user.name}
                    </span>
                  </Pill>
                </Link>
              )}
            </div>

            <div className="justify-center mb-6">
              <Link
                href="/dashboard"
                className="text-xl -ml-4"
              >
                <Image
      src="/icon.png"
      width={110}
      height={50}
      alt="Picture of the author"
    />
                
              </Link>
            </div>

            <div className="flex justify-center md:hidden">
              <Pill>
                <ThemeToggle />
              </Pill>
            </div>
          </div>

          {/* DESKTOP HEADER */}
          
          <div className="relative hidden md:grid grid-cols-5 items-center h-16 px-4">
            
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
                <Link href="/profile">
                  <Pill>
                    <span className="text-lg font-semibold truncate max-w-[90px]">
                      {session.user.name}
                    </span>
                  </Pill>
                </Link>
              )}
            </div>

            <div className="flex -mr-80 justify-center">
              <Pill>
                <ThemeToggle />
              </Pill>
            </div>

            <div className="flex justify-center -mr-75 h-11">
              {session && (
                <Pill>
                  <LogoutButton />
                </Pill>
              )}
            </div>
          </div>
          </header>
        
      </div>

      

      <div className="flex flex-1 w-full px-4">
  <aside className="hidden md:block w-60 pr-6 pt-6">
    <Sidebar />
  </aside>

  <main
    className="
      flex-1
      w-full
      max-w-none
      md:max-w-5xl
      md:mx-auto
      p-4 sm:p-6 md:p-8
      pb-24 md:pb-8
    "
  >
    {!hidePageHeader && (
      <div className="mb-4">
        <PageHeader />
      </div>
    )}

    <div className="animate-fadeIn">{children}</div>
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
        transition
      "
    >
      {children}
    </div>
  );
}
