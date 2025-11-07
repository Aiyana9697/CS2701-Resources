import React from "react";
import "./Separator.css";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export function Separator({
  className = "",
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? undefined : "separator"}
      className={`separator ${orientation} ${className}`}
      {...props}
    />
  );
}
