/*
UI component that creates a styled accordion (list where sections can be expanded / collapsed) using Radix UI 
each section has: 
- a trigger (header) that can be clicked to expand / collapse the section
- hidden content that is revealed when the section is expanded
*/

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "./utils";

/*
defines the main Accordion component that wraps the Radix AccordionPrimitive.Root component (which manages the accordion state and behaviour)
passes down any recieved props and adds a data-slot attribute which can be used for styling 
*/
export function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

/*
wraps the Radix AccordionPrimitive.Item component representing each item in the accordion
passes down any recieved props and css class names to allow for custom styling
adds a data-slot attribute for styling and applies default border to separate each item visually
*/
export function AccordionItem({
  className,
  ...props}: 
  React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

/*
Wraps the Radix AccordionPrimitive.Trigger component which acts as the clickable header for each accordion item
passes down any recieved props , css class names for custom styling and children elements to be displayed inside the trigger
adds a ChevronDownIcon that rotates when the accordion item is expanded / collapsed
*/
export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/*
Wraps the Radix AccordionPrimitive.Content component which contains the hidden content revealed when the accordion item is expanded
passes down any recieved props , css class names for custom styling and children elements to be displayed inside the content area
adds a slide up / down animation when the content is expanded / collapsed
*/
export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
