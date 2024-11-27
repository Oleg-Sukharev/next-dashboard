import { clsx,ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const mc = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default mc;
