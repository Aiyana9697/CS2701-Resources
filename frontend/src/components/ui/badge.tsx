/*
UI component used to display a badge (label) with different colour styles (default, secondary, destructive, outline)
Slot - allows the badge to style different HTML element if needed (e.g. a link)
cva - class variance authority defines and manage the different style variants for the badge
cn - utility function that combines multiple class names together 
*/
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

/*
defines the base style that all badge variants share (inline flex container with rounded corners, padding, font size, etc)
variants: 
- default: uses apps main primary colour for background and text 
- secondary: background uses a secondary / softer colour
- destructive: bright red background and white text 
- outline: no background, just text 

if no variant is passed to the Badge component, the default variant is applied
(styles defined in globals.css)
*/
export const badgeVariants = cva(
"inline-flex items-center justify-center gap-1 rounded-md border px-2 py-1 text-xs font-medium w-fit bg-gray-100",  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/*
badge components that accepts className for custom styling, variant to select the badge style, asChild to decide what HTML element gets styled, and props to pass down to the rendered element
tenary operator: 
- if asChild is true, the Slot component is used to apply styles to a different HTML element (e.g. a link)
- if asChild is false, a span element is used by default (invisible container used to style words inside a sentence) 
*/
export function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
const Comp = (asChild ? Slot : "span") as React.ElementType;

  /*
  badgeVariants function is called to select the correct variant and any extra className passed in
  cn() combines the variant and clasname into one clean string
  props passes any extra attributes (like id, onClick, etc.) to the element
  */
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
