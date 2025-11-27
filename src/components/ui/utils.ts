/*
Utility function that combines and cleans up css class names 
accepts many class name inputs (strings, arrays, etc) and outputs a clean string
twMerge() is used to resolve tailwind class conflicts
*/
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
