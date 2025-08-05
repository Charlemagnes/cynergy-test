import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// transform the object's keys to lowercase and parse number values
export function keysToLowercase<T>(obj: any): T {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    // If value is a number or a string that can be parsed as a number, parse it
    if (typeof value === "string" && !isNaN(Number(value)) && value.trim() !== "") {
      value = Number(value);
    }
    newObj[key.toLowerCase()] = value;
  });
  return newObj as T;
}
