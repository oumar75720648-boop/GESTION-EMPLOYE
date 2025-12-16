import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormData<T>(formData: FormData): T {
  const result: Record<string, FormDataEntryValue> = {};

  formData.forEach((value, key) => {
    result[key] = value;
  });

  return result as T;
}

function formatDateTime(dateString: string | Date | null | undefined): string {
  if (!dateString) return '-';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year}, ${hours}:${minutes}`;
}

export function formatUrl(url: string): string {
  return url.replace(/([^:]\/)\/+/g, '$1');
}

function formatAmount(amount: number): string {
  return amount.toLocaleString('en', { useGrouping: true }).replace(/,/g, ' ');
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getInitials(fullName: string): string {
  const names = fullName.trim().split(/\s+/);
  if (names.length >= 2) {
    return (
      names[0][0].toUpperCase() + names[1][0].toUpperCase()
    );
  } else if (names.length === 1 && names[0].length >= 2) {
    return names[0].substring(0, 2).toUpperCase();
  }

  return ""; 
}

export const Utils = { formatAmount, sleep, formatDateTime, getInitials };
