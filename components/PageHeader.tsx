"use client";

import React from "react";

type Props = {
  title?: string; // ✅ optional
  description?: string;
  rightSlot?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  rightSlot,
}: Props) {
  // if nothing is provided, render nothing
  if (!title && !description && !rightSlot) {
    return null;
  }

  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        {title && (
          <h1 className="text-2xl font-extrabold text-[#381D03]">
            {title}
          </h1>
        )}

        {description && (
          <p className="mt-1 text-sm text-[#736046]">
            {description}
          </p>
        )}
      </div>

      {rightSlot && (
        <div className="shrink-0">
          {rightSlot}
        </div>
      )}
    </div>
  );
}
