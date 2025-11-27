/*
UI component used to display a checkbox with custom styles using Radix UI
uses CheckIcon from lucide-react to display a checkmark when the checkbox is selected
cn - utility function that combines multiple class names together 
*/
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "./utils";

/*
defines the Checkbox component that wraps the Radix CheckboxPrimitive.Root component which manages the checkbox state and behaviour
accepts className for custom styling and other props to be passed down to the CheckboxPrimitive.Root element
applies default styles for border, background colour, rounded corners, and shadow

checkbox indicator (the checkmark) is rendered using CheckboxPrimitive.Indicator component
applies flex layout to center the checkmark icon and transition effect for smooth appearance
*/ 
export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

