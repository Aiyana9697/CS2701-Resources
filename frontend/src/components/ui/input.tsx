import React from "react";
import "./Input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = "", type = "text", ...props }: InputProps) {
  return <input type={type} className={`input ${className}`} {...props} />;
}
