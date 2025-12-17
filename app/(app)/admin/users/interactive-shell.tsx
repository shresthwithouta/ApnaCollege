"use client";

import { ReactNode, useRef } from "react";

export default function InteractiveShell({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    ref.current!.style.setProperty("--mx", `${x}%`);
    ref.current!.style.setProperty("--my", `${y}%`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="relative min-h-full"
    >
      
      <div
        className="
          pointer-events-none
          absolute inset-0 -z-10
          transition-opacity duration-500
        "
        style={{
          background: `
            radial-gradient(
              600px at var(--mx, 50%) var(--my, 50%),
              var(--accent-soft),
              transparent 60%
            )
          `,
          opacity: 0.35,
        }}
      />

     
      <div
        className="
          pointer-events-none
          absolute inset-0 -z-20
        "
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(0,0,0,0.03),
              transparent 40%
            )
          `,
        }}
      />

      {children}
    </div>
  );
}
