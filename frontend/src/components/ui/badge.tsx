import React from "react";
import "./Badge.css";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant = "default", children, ...props }: BadgeProps) {
  return (
    <span className={`badge badge-${variant}`} {...props}>
      {children}
    </span>
  );
}
