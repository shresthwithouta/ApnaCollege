"use client";

import React from "react";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, className, ...rest }: Props) {
  return (
    <label className="flex flex-col gap-1">
      {label && (
        <span className="text-sm font-medium text-[#381D03]">
          {label}
        </span>
      )}

      <input
        {...rest}
        className={clsx(
          "rounded-lg px-3 py-2",
          "bg-[#FEFAE0] text-[#381D03]",
          "border border-[#A19379]",
          "placeholder:text-[#736046]",
          "focus:outline-none focus:ring-2 focus:ring-[#676F53]",
          className
        )}
      />
    </label>
  );
}
