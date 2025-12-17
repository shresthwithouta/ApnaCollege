"use client";

import { useEffect, useState } from "react";

type Tag = {
  _id: string;
  name: string;
  color?: string;
};

type Props = {
  selectedTags?: string[]; // 👈 allow undefined safely
  onChange: (tags: string[]) => void;
};

export default function UserTagSelector({
  selectedTags = [], // 👈 DEFAULT VALUE (KEY FIX)
  onChange,
}: Props) {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function loadTags() {
      const res = await fetch("/api/tags");
      const data: { tags?: Tag[] } = await res.json();

      setTags(data.tags ?? []);
    }

    loadTags();
  }, []);

  function toggleTag(id: string) {
    if (selectedTags.includes(id)) {
      onChange(selectedTags.filter((t) => t !== id));
    } else {
      onChange([...selectedTags, id]);
    }
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-[#381D03] mb-2">
        Tags
      </h3>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const active = selectedTags.includes(tag._id);

          return (
            <button
              key={tag._id}
              type="button"
              onClick={() => toggleTag(tag._id)}
              style={{
                backgroundColor: active
                  ? tag.color || "#676F53"
                  : "#EDE9D5",
                color: active ? "white" : "#381D03",
              }}
              className="
                px-3 py-1 rounded-full text-xs font-medium
                transition hover:scale-[1.03]
              "
            >
              {tag.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
