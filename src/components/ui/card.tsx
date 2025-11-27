/*
UI component used to style cards throughout the application 
each component represents a different part of the card (header, title, description, action, content, footer)
*/
import * as React from "react";
import { cn } from "./utils";

/*
defines the main card that acts as a container for all other card components
applies default styles for background colour, text colour, flex layout, gap between elements, rounded corners, and border
accepts className prop for custom styling and other props to be passed down to the div element
*/
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn( "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border", className,)}
      {...props}
    />
  );
}

/*
defines the card header component that contains the title, description, and optional action elements
applies grid layout to arrange elements and padding for spacing
accepts className prop for custom styling and other props to be passed down to the div element
*/
export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

/*
defines the card title component that styles the title text
applies leading-none class which removes extra space above and below the text
accepts className prop for custom styling and other props to be passed down to the h4 element
*/
export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

/*
defines the card description component that styles the description text
applies muted-foreground class to give the text a lighter colour
accepts className prop for custom styling and other props to be passed down to the p element
*/
export function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

/*
defines the card action component that positions action elements (e.g. buttons, icons) in the top-right corner of the card header
uses grid layout to position the action element 
accepts className prop for custom styling and other props to be passed down to the div element
*/
export function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

/*
defines the card content component that wraps the main content of the card
applies horizontal padding and bottom padding to the last child element for spacing
accepts className prop for custom styling and other props to be passed down to the div element
*/
export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

/*
defines the card footer component that wraps the footer content of the card
applies flex layout to align items in the center, horizontal padding, bottom padding, and top border spacing
accepts className prop for custom styling and other props to be passed down to the div element
*/
export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

