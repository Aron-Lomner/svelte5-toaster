<script lang="ts">
	type Props = {
		size?: number
		class?: string
	}

	let { size = 20, class: className = '' }: Props = $props()
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="svt-spinner {className}"
	aria-hidden="true"
>
	<path d="M21 12a9 9 0 1 1-6.219-8.56" />
</svg>

<style>
	.svt-spinner {
		animation: svt-spin 1s linear infinite;
	}

	@keyframes svt-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.svt-spinner {
			animation: none;
		}
	}
</style>
