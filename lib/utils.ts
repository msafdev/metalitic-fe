import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_STORAGE_BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateInput: string, withTime = true): string {
  try {
    let date: Date;

    if (dateInput.includes("/")) {
      const [datePart, timePart] = dateInput.split(" ");
      const [day, month, year] = datePart.split("/").map(Number);
      const [hour, minute] = timePart
        ? timePart.split(":").map(Number)
        : [0, 0];
      date = new Date(year, month - 1, day, hour, minute);
    } else {
      date = new Date(dateInput);
    }

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric"
    };

    if (withTime) {
      options.hour = "2-digit";
      options.minute = "2-digit";
      options.hour12 = false;
    }

    return date.toLocaleString("id-ID", options);
  } catch {
    return dateInput;
  }
}

export function getUpload(pathname?: string): string {
  if (!pathname) return `${API_URL}/uploads/avatar/placeholder.png`;

  return `${API_URL}${pathname}`;
}

export function getAssetImage(pathname: string): string {
  if (pathname.startsWith("http")) return pathname;

  return `${STORAGE_BASE_URL}/${pathname}`;
}
