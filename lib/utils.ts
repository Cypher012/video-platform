import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { randomInt } from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCode(length = 6): string {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += randomInt(0, 10); // 0 to 9
  }
  return code;
}
