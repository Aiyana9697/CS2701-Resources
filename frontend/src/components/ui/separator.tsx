/* 
UI component for rendering a styled separator using Radix UI that visually divides content horizontally / vertically
*/
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "./utils";

/*
interface defines the props accepted by the Separator component (all props that Radix SeparatorPrimitive.Root accepts)
*/
export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {}

/*
defines the Separator component that wraps the Radix SeparatorPrimitive.Root component which styles the separator element
accepts:
- className for custom styling
- orientation to specify horizontal / vertical separator (default is horizontal)
- decorative to indicate if the separator is purely decorative (default is true) 
- and other props to be passed down to the SeparatorPrimitive.Root element

the decorative and orientation props are passed through and applies default styles for size and background colour based on the orientation
accepts className prop for additional custom styling and other props to be passed down to the Separator element
*/   
export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-slate-800 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  );
}

