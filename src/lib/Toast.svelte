<script lang="ts">
	import type { Toast, ToastVariant, ToastPosition } from './types.js'
	import { toast } from './toast.svelte.js'
	import IconSuccess from './icons/IconSuccess.svelte'
	import IconError from './icons/IconError.svelte'
	import IconWarning from './icons/IconWarning.svelte'
	import IconInfo from './icons/IconInfo.svelte'
	import IconLoading from './icons/IconLoading.svelte'

	type Props = {
		data: Toast
		variant: ToastVariant
		position: ToastPosition
	}

	let { data, variant, position }: Props = $props()

	// Determine icon component based on toast type
	const iconComponents = {
		success: IconSuccess,
		error: IconError,
		warning: IconWarning,
		info: IconInfo,
		loading: IconLoading,
		default: null
	}

	let IconComponent = $derived(data.icon ?? iconComponents[data.type])
	let effectiveVariant = $derived(data.variant ?? variant)

	// ARIA attributes based on toast type
	let role = $derived<'alert' | 'status'>(data.type === 'error' ? 'alert' : 'status')
	let ariaLive = $derived<'assertive' | 'polite'>(data.type === 'error' ? 'assertive' : 'polite')

	// Auto-dismiss timer
	$effect(() => {
		if (data.duration === Infinity) return

		const timer = setTimeout(() => {
			toast.dismiss(data.id)
		}, data.duration)

		return () => clearTimeout(timer)
	})

	function handleClick() {
		toast.dismiss(data.id)
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			toast.dismiss(data.id)
		}
	}

	// Determine slide direction based on position
	let slideDirection = $derived.by(() => {
		if (position.includes('left')) return 'left'
		if (position.includes('right')) return 'right'
		if (position.startsWith('top')) return 'top'
		return 'bottom'
	})
</script>

<button
	type="button"
	class="svt-toast svt-toast--{data.type} svt-variant-{effectiveVariant} svt-slide-{slideDirection}"
	{role}
	aria-live={ariaLive}
	onclick={handleClick}
>
	{#if IconComponent}
		<div class="svt-toast__icon">
			<IconComponent size={20} />
		</div>
	{/if}
	<div class="svt-toast__content">
		<div class="svt-toast__title">{data.title}</div>
		{#if data.description}
			<div class="svt-toast__description">{data.description}</div>
		{/if}
	</div>
</button>
