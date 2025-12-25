<script lang="ts">
	import type { Snippet } from 'svelte'
	import CodeBlock from './CodeBlock.svelte'

	type Props = {
		title?: string
		description?: string
		code: string
		buttonText?: string
		buttonVariant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading' | 'pattern'
		onclick?: () => void
		children?: Snippet
	}

	let {
		title,
		description,
		code,
		buttonText = 'Run',
		buttonVariant = 'default',
		onclick,
		children
	}: Props = $props()
</script>

<div class="example">
	{#if title}
		<h3>{title}</h3>
	{/if}
	{#if description}
		<p class="note">{description}</p>
	{/if}
	<CodeBlock {code} />
	{#if children}
		{@render children()}
	{:else if onclick}
		<button class={buttonVariant} {onclick}>{buttonText}</button>
	{/if}
</div>

<style>
	.example {
		margin-bottom: 24px;
	}

	h3 {
		font-size: 1.1rem;
		margin: 24px 0 12px;
	}

	.note {
		font-size: 0.9rem;
		color: #666;
		margin: 0 0 12px;
	}

	:global(.dark) .note {
		color: #999;
	}

	button {
		padding: 8px 16px;
		border: none;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: transform 0.1s, opacity 0.1s;
		background: #e5e5e5;
		color: #333;
	}

	:global(.dark) button {
		background: #333;
		color: #f5f5f5;
	}

	button:hover {
		transform: translateY(-1px);
	}

	button:active {
		transform: translateY(0);
	}

	button.success {
		background: #10b981;
		color: white;
	}
	button.error {
		background: #ef4444;
		color: white;
	}
	button.warning {
		background: #f59e0b;
		color: white;
	}
	button.info {
		background: #3b82f6;
		color: white;
	}
	button.loading {
		background: #6b7280;
		color: white;
	}
	button.pattern {
		background: #8b5cf6;
		color: white;
	}
</style>
