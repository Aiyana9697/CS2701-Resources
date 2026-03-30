/*
UI component used to display a button with different colour styles (default, destructive, outline, secondary, ghost, link) and sizes (default, sm, lg, icon)
Slot - allows the button to style different HTML element if needed (e.g. a link)
cva - class variance authority defines and manage the different style variants for the button
cn - utility function that combines multiple class names together 
*/
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

/*
defines the base style that all button variants share (inline flex container with rounded corners, padding, font size, etc)
variants: 
- default: uses apps main primary colour for background and text 
- destructive: bright red background and white text
- outline: no background, just border and text
- secondary: background uses a secondary / softer colour
- ghost: transparent background with hover effects
- link: looks like a text link with underline on hover

sizes:
- default: standard button height and padding
- sm: smaller height and padding
- lg: larger height and padding
- icon: square button sized to fit an icon

if no variant or size is passed to the Button component, the default variant and size are applied
(styles defined in globals.css)
*/
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-opacity-0 text-white px-4 py-2 hover:bg-blue-500",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/*
badge components that accepts className for custom styling, variant to select the button style, asChild to decide what HTML element gets styled, and props to pass down to the rendered element
tenary operator: 
- if asChild is true, the Slot component is used to apply styles to a different HTML element (e.g. a link)
- if asChild is false, a button element is used by default (the standard clickable button element)
*/
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
const Comp = (asChild ? Slot : "button") as React.ElementType;

  /*
  buttonVariants function is called to select the correct variant and size along with any extra className passed in
  cn() combines the variant, size, and clasname into one clean string
  props passes any extra attributes (like id, onClick, etc.) to the element
  */
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
