import React, { useState } from "react";
import "./Accordion.css";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  children: React.ReactNode;
  multiple?: boolean;
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  return <div className="accordion">{children}</div>;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button
        className={`accordion-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className="accordion-icon" size={16} />
      </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
}
