"use client";

import type { BadgeType } from "./types";

interface Props {
  type: BadgeType;
  size?: number;
}

export function BadgeIcon({ type, size = 8 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
  } as const;

  if (type === "3D" || type === "AR") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="9" ry="3" />
      </svg>
    );
  }
  if (type === "Video") {
    return (
      <svg {...common}>
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="3" />
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    </svg>
  );
}
