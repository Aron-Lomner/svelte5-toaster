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
	class={className}
	aria-hidden="true"
>
	<circle cx="12" cy="12" r="10" />
	<path d="m15 9-6 6" />
	<path d="m9 9 6 6" />
</svg>
