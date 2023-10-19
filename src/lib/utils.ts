import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setColor = (data: {
  primary: string;
  secondary: string;
  bg: string;
}) => {
  document.documentElement.style.setProperty('--primary', data.primary);
  document.documentElement.style.setProperty('--background-color', data.bg);
  document.documentElement.style.setProperty('--secondary', data.secondary);
};
