import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function generateRandomId() {
	return window.crypto.randomUUID()
}

export function deepClone<T>(obj: T) {
	return window.structuredClone(obj) as T
}
