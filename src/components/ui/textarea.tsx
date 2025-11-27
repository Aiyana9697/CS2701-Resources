/*
UI component that renders a styled input field for multi-line text
*/

/*
defines the input component that wraps a standard HTML input element
accepts className for custom styling and other props to be passed down to the input element 
applies default styles for border, background colour, rounded corners, and shadoow
accepts className prop for additional custom styling and other props to be passed down to the input element
*/ 
import * as React from "react";
import { cn } from "./utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
        className,
      )}
      {...props}
    />
  );
}

