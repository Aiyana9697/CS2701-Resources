import React, { useState } from "react";
import "./Tabs.css";

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function Tabs({ className = "", children, ...props }: TabsProps) {
  return (
    <div className={`tabs ${className}`} {...props}>
      {children}
    </div>
  );
}

export function TabsList({ className = "", children, ...props }: TabsProps) {
  return (
    <div className={`tabs-list ${className}`} {...props}>
      {children}
    </div>
  );
}

export function TabsTrigger({ className = "", children, ...props }: TabsTriggerProps) {
  return (
    <button className={`tabs-trigger ${className}`} {...props}>
      {children}
    </button>
  );
}

export function TabsContent({ className = "", children, ...props }: TabsContentProps) {
  return (
    <div className={`tabs-content ${className}`} {...props}>
      {children}
    </div>
  );
}
