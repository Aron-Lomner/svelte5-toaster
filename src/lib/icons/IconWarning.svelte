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
	<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
	<path d="M12 9v4" />
	<path d="M12 17h.01" />
</svg>
