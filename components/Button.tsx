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
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-transparent text-#381D03 hover:text-[#381D03]/70 ",
    ghost:
      "bg-black w-22 text-[] hover:bg-[#A19379]/70 focus-visible:ring-[#A19379] transition-600 hover:outline-[#381D03] hover:outline-4",
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
