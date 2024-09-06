import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { serializeError } from 'serialize-error';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = async (ms: number) => {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const truncate = (
  str: string,
  length?: number,
  fromMiddle?: boolean
) => {
  const middle = fromMiddle ?? true;
  const len = length ?? 20;
  if (str.length <= len) {
    return str;
  }
  if (middle) {
    return `${str.slice(0, len / 2)}...${str.slice(-len / 2)}`;
  }
  return `${str.slice(0, len)}...`;
};

export const errorHandler = (error: unknown) => {
  return serializeError(error);
};
