<script lang="ts">
	import type { Snippet } from 'svelte'
	import { toast } from '$lib'

	type Props = {
		filename?: string
		code?: string
		children?: Snippet
	}

	let { filename, code, children }: Props = $props()
	let copied = $state(false)

	async function copyToClipboard() {
		if (!code) return

		try {
			await navigator.clipboard.writeText(code)
			copied = true
			toast.success('Copied to clipboard')
			setTimeout(() => (copied = false), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
			toast.error('Failed to copy')
		}
	}
</script>

<div class="code-block">
	{#if filename}
		<div class="code-header">
			<span>{filename}</span>
			{#if code}
				<button class="copy-btn" onclick={copyToClipboard} title="Copy to clipboard">
					{#if copied}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					{:else}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
						</svg>
					{/if}
				</button>
			{/if}
		</div>
	{/if}
	<div class="code-content">
		<pre><code>{#if code}{code}{:else if children}{@render children()}{/if}</code></pre>
		{#if code && !filename}
			<button class="copy-btn floating" onclick={copyToClipboard} title="Copy to clipboard">
				{#if copied}
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="20 6 9 17 4 12"></polyline>
					</svg>
				{:else}
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
						<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
					</svg>
				{/if}
			</button>
		{/if}
	</div>
</div>

<style>
	.code-block {
		background: #f5f5f5;
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 12px;
	}

	:global(.dark) .code-block {
		background: #1a1a1a;
	}

	.code-header {
		background: #e5e5e5;
		padding: 6px 12px;
		font-size: 0.8rem;
		font-weight: 500;
		color: #666;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	:global(.dark) .code-header {
		background: #262626;
		color: #999;
	}

	.code-content {
		position: relative;
	}

	pre {
		margin: 0;
		padding: 16px;
		overflow-x: auto;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	code {
		font-family: 'SF Mono', Consolas, monospace;
		font-size: 0.875em;
	}

	.copy-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4px;
		border: none;
		background: transparent;
		color: #666;
		cursor: pointer;
		border-radius: 4px;
		transition: background 0.15s, color 0.15s;
	}

	.copy-btn:hover {
		background: rgba(0, 0, 0, 0.1);
		color: #333;
	}

	:global(.dark) .copy-btn {
		color: #999;
	}

	:global(.dark) .copy-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #fff;
	}

	.copy-btn.floating {
		position: absolute;
		top: 8px;
		right: 8px;
		background: rgba(0, 0, 0, 0.05);
		opacity: 0;
		transition: opacity 0.15s, background 0.15s;
	}

	.code-content:hover .copy-btn.floating {
		opacity: 1;
	}

	.copy-btn.floating:hover {
		background: rgba(0, 0, 0, 0.1);
	}

	:global(.dark) .copy-btn.floating {
		background: rgba(255, 255, 255, 0.05);
	}

	:global(.dark) .copy-btn.floating:hover {
		background: rgba(255, 255, 255, 0.1);
	}
</style>
