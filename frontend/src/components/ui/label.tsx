/*
UI component for rendering a styles label using Radix UI 
*/
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "./utils";

/*
defines the Label component that wraps the Radix LabelPrimitive.Root component which styles the label element
accepts className for custom styling and other props to be passed down to the Label element
applies default styles for font size, weight, spacing
accepts className prop for additional custom styling and other props to be passed down to the Label element
*/ 
export function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        className,
      )}
      {...props}
    />
  );
}


