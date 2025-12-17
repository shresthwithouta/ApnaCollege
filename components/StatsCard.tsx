"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";

type Variant = "default" | "accent";

type Props = {
  title: string;
  value: number | string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: Variant;
  animate?: boolean;
};

export default function StatsCard({
  title,
  value,
  children,
  icon,
  variant = "default",
  animate = true,
}: Props) {
  const isNumber = typeof value === "number";
  const [displayValue, setDisplayValue] = useState<number | string>(
    isNumber ? 0 : value
  );


  useEffect(() => {
    if (!animate || !isNumber) return;

    let start = 0;
    const end = value as number;
    const duration = 600;
    const stepTime = 20;
    const increment = Math.ceil(end / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, animate, isNumber]);

  return (
    <div
      className={clsx(
        "rounded-2xl p-5 flex flex-col justify-between border transition-all",
        variant === "accent"
          ? "bg-[#B3B491] border-[#676F53]"
          : "bg-white border-[#A19379]"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#736046]">
            {title}
          </p>
          <p className="mt-2 text-2xl font-bold text-[#381D03]">
            {displayValue}
          </p>
        </div>

        {icon && (
          <div className="text-xl text-[#676F53]">
            {icon}
          </div>
        )}
      </div>

      {children && (
        <p className="mt-3 text-sm text-[#736046]">
          {children}
        </p>
      )}
    </div>
  );
}
