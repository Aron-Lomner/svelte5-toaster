import type { Toast, ToastType, ToastOptions } from './types.js'

const DEFAULT_DURATION = 4000
const LOADING_DURATION = Infinity
const DEFAULT_MAX = 5

// Module-level reactive state
let toasts = $state<Toast[]>([])
let maxToasts = DEFAULT_MAX

function generateId(): string {
	return crypto.randomUUID()
}

// Allow Toaster to set the max limit
export function setMax(max: number): void {
	maxToasts = max
	// Trim existing toasts if over the new limit
	if (toasts.length > maxToasts) {
		toasts.splice(0, toasts.length - maxToasts)
	}
}

function getDefaultDuration(type: ToastType): number {
	return type === 'loading' ? LOADING_DURATION : DEFAULT_DURATION
}

function show(type: ToastType, title: string, options?: ToastOptions): string {
	const id = options?.id ?? generateId()
	const duration = options?.duration ?? getDefaultDuration(type)

	const newToast: Toast = {
		id,
		type,
		title,
		description: options?.description,
		duration,
		icon: options?.icon,
		variant: options?.variant,
		createdAt: Date.now()
	}

	// Check if toast with this ID already exists (for updates)
	const existingIndex = toasts.findIndex((t) => t.id === id)

	if (existingIndex !== -1) {
		// Update existing toast in place
		toasts[existingIndex] = newToast
	} else {
		// Add new toast
		toasts.push(newToast)
		// Remove oldest toasts if over the limit
		if (toasts.length > maxToasts) {
			toasts.splice(0, toasts.length - maxToasts)
		}
	}

	return id
}

function dismiss(id: string): void {
	const index = toasts.findIndex((t) => t.id === id)
	if (index !== -1) {
		toasts.splice(index, 1)
	}
}

function dismissAll(): void {
	toasts.length = 0
}

// Export the toast API object
export const toast = {
	default: (title: string, options?: ToastOptions) => show('default', title, options),
	success: (title: string, options?: ToastOptions) => show('success', title, options),
	error: (title: string, options?: ToastOptions) => show('error', title, options),
	warning: (title: string, options?: ToastOptions) => show('warning', title, options),
	info: (title: string, options?: ToastOptions) => show('info', title, options),
	loading: (title: string, options?: ToastOptions) => show('loading', title, options),
	dismiss,
	dismissAll
}

// Export getter for toasts array (for Toaster component)
export function getToasts(): Toast[] {
	return toasts
}
