import type { Component } from 'svelte'

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading'

export type ToastPosition =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'center-left'
	| 'center'
	| 'center-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'

export type ToastVariant = 'rich' | 'minimal'

export type ToastStack = 'vertical' | 'collapsed'

export type ToastTheme = 'light' | 'dark'

export type ToastOptions = {
	id?: string
	description?: string
	duration?: number
	icon?: Component
	variant?: ToastVariant
}

export type Toast = {
	id: string
	type: ToastType
	title: string
	description?: string
	duration: number
	icon?: Component
	variant?: ToastVariant
	createdAt: number
}

export type ToasterProps = {
	position?: ToastPosition
	stack?: ToastStack
	theme?: ToastTheme
	variant?: ToastVariant
	duration?: number
	max?: number
}
