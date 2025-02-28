import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizePath(path: string) {
  return path.replace(/\\/g, "/");
}

export function getFileName(path: string) {
  return normalizePath(path).split("/").pop();
}
