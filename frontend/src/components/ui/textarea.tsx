import React from "react";
import "./Textarea.css";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`custom-textarea ${className}`}
      {...props}
    />
  );
}
