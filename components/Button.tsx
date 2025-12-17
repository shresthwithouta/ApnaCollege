"use client";

import clsx from "clsx";
import React from "react";

type ButtonVariant = "primary" | "ghost" | "danger";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[#676F53] text-white hover:bg-[#5f664a] focus-visible:ring-[#676F53]",
    ghost:
      "bg-transparent text-[#381D03] hover:bg-[#A19379]/20 focus-visible:ring-[#A19379]",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
