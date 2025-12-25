<script lang="ts">
	import type { ToastPosition, ToastStack, ToastTheme, ToastVariant } from './types.js'
	import { getToasts, setMax } from './toast.svelte.js'
	import Toast from './Toast.svelte'
	import './styles.css'

	type Props = {
		position?: ToastPosition
		stack?: ToastStack
		theme?: ToastTheme
		variant?: ToastVariant
		duration?: number
		max?: number
	}

	let {
		position = 'top-right',
		stack = 'vertical',
		theme = 'light',
		variant = 'rich',
		max = 5
	}: Props = $props()

	// Sync max limit with toast state
	$effect(() => {
		setMax(max)
	})

	// Get reactive toasts from the state module
	let toasts = $derived(getToasts())

	// Determine if position is on top, center, or bottom for stacking order
	let isTopPosition = $derived(position.startsWith('top'))
	let isCenterVertical = $derived(position.startsWith('center'))

	// For collapsed stacking, we show newest on top
	// For vertical stacking, newest appears at the end
	let orderedToasts = $derived.by(() => {
		if (stack === 'collapsed') {
			// Reverse so newest is visually on top
			return [...toasts].reverse()
		}
		return toasts
	})
</script>

<div
	class="svt-toaster svt-position-{position} svt-stack-{stack} svt-theme-{theme}"
	class:svt-stack-up={stack === 'collapsed' && position.startsWith('bottom')}
	aria-label="Notifications"
>
	{#each orderedToasts as toastData, index (toastData.id)}
		{@const stackIndex = stack === 'collapsed' ? index : 0}
		<div
			class="svt-toast-wrapper"
			style:--stack-index={stackIndex}
			style:--total-toasts={orderedToasts.length}
		>
			<Toast data={toastData} {variant} {position} />
		</div>
	{/each}
</div>
