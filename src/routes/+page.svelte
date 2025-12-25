<script lang="ts">
	import { Toaster, toast, type ToastPosition, type ToastVariant, type ToastTheme } from '$lib'
	import CodeBlock from './components/CodeBlock.svelte'
	import Example from './components/Example.svelte'
	import ApiTable from './components/ApiTable.svelte'

	// Configuration state
	let position: ToastPosition = $state('top-right')
	let theme: ToastTheme = $state('light')
	let variant: ToastVariant = $state('rich')
	let stack: 'vertical' | 'collapsed' = $state('vertical')

	// Toast type definitions
	const toastTypes = [
		{ type: 'default', label: 'Default', code: "toast.default('This is a default toast')" },
		{ type: 'success', label: 'Success', code: "toast.success('Successfully saved!')" },
		{ type: 'error', label: 'Error', code: "toast.error('Something went wrong')" },
		{ type: 'warning', label: 'Warning', code: "toast.warning('Please review your input')" },
		{ type: 'info', label: 'Info', code: "toast.info('New update available')" },
		{ type: 'loading', label: 'Loading', code: "toast.loading('Loading data...')" }
	] as const

	function showToast(type: (typeof toastTypes)[number]['type']) {
		const messages = {
			default: 'This is a default toast',
			success: 'Successfully saved!',
			error: 'Something went wrong',
			warning: 'Please review your input',
			info: 'New update available',
			loading: 'Loading data...'
		}
		toast[type](messages[type])
	}

	// Configuration options
	const positions: ToastPosition[] = [
		'top-left',
		'top-center',
		'top-right',
		'bottom-left',
		'bottom-center',
		'bottom-right'
	]

	const configOptions = [
		{ id: 'position', label: 'Position', options: positions },
		{ id: 'theme', label: 'Theme', options: ['light', 'dark'] },
		{ id: 'variant', label: 'Variant', options: ['rich', 'minimal'] },
		{ id: 'stack', label: 'Stack', options: ['vertical', 'collapsed'] }
	] as const

	// API reference data
	const toastFunctions = [
		{ name: 'toast.default(title, options?)', description: 'Show a default toast' },
		{ name: 'toast.success(title, options?)', description: 'Show a success toast' },
		{ name: 'toast.error(title, options?)', description: 'Show an error toast' },
		{ name: 'toast.warning(title, options?)', description: 'Show a warning toast' },
		{ name: 'toast.info(title, options?)', description: 'Show an info toast' },
		{ name: 'toast.loading(title, options?)', description: 'Show a loading toast (infinite duration)' },
		{ name: 'toast.dismiss(id)', description: 'Dismiss a specific toast by ID' },
		{ name: 'toast.dismissAll()', description: 'Dismiss all toasts' }
	]

	const toastOptions = [
		{ option: 'id', type: 'string', description: 'Custom ID (useful for updating toasts)' },
		{ option: 'description', type: 'string', description: 'Secondary text below the title' },
		{ option: 'duration', type: 'number', description: 'Auto-dismiss delay in ms (default: 4000)' },
		{ option: 'icon', type: 'Component', description: 'Custom Svelte component for icon' }
	]

	const toasterProps = [
		{ prop: 'position', type: 'ToastPosition', default: "'top-right'", description: 'Screen position' },
		{ prop: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Color theme' },
		{ prop: 'variant', type: "'rich' | 'minimal'", default: "'rich'", description: 'Visual style' },
		{ prop: 'stack', type: "'vertical' | 'collapsed'", default: "'vertical'", description: 'Stacking behavior' },
		{ prop: 'max', type: 'number', default: '5', description: 'Maximum toasts (oldest removed)' }
	]

	// Demo functions
	function showWithDescription() {
		toast.success('File uploaded', {
			description: 'Your file has been uploaded successfully.'
		})
	}

	function showCustomDuration() {
		toast.info('This stays for 10 seconds', { duration: 10000 })
	}

	async function showLoadingPattern() {
		const id = toast.loading('Saving changes...')
		await new Promise((resolve) => setTimeout(resolve, 2000))
		Math.random() > 0.3
			? toast.success('Changes saved!', { id })
			: toast.error('Failed to save', { id })
	}

	let persistentId: string | null = $state(null)

	function showPersistent() {
		persistentId = toast.loading('Processing...', { duration: Infinity })
	}

	function dismissPersistent() {
		if (persistentId) {
			toast.dismiss(persistentId)
			persistentId = null
		}
	}

	// Get config value by id
	function getConfigValue(id: string) {
		const values: Record<string, string> = { position, theme, variant, stack }
		return values[id]
	}

	function setConfigValue(id: string, value: string) {
		if (id === 'position') position = value as ToastPosition
		else if (id === 'theme') theme = value as ToastTheme
		else if (id === 'variant') variant = value as ToastVariant
		else if (id === 'stack') stack = value as 'vertical' | 'collapsed'
	}
</script>

<Toaster {position} {theme} {variant} {stack} />

<main class="docs" class:dark={theme === 'dark'}>
	<header class="hero">
		<h1>svelte5-toaster</h1>
		<p class="tagline">A lightweight, customizable toast notification library for Svelte 5</p>
	</header>

	<!-- Quickstart -->
	<section>
		<h2>Quickstart</h2>

		<h3>Installation</h3>
		<CodeBlock code="npm install svelte-toaster" />

		<h3>Basic Setup</h3>
		<p>Add the <code>Toaster</code> component to your root layout and use the <code>toast</code> API anywhere.</p>

		<CodeBlock
			filename="+layout.svelte"
			code={`${'<'}script>
  import { Toaster } from 'svelte5-toaster'
${'<'}/script>

<Toaster />
<slot />`}
		/>

		<CodeBlock
			filename="+page.svelte"
			code={`${'<'}script>
  import { toast } from 'svelte5-toaster'
${'<'}/script>

<button onclick={() => toast.success('Hello!')}>
  Show Toast
</button>`}
		/>
	</section>

	<!-- Toast Types -->
	<section>
		<h2>Toast Types</h2>
		<p>Six built-in toast types with appropriate icons and styling.</p>

		<div class="example-grid">
			{#each toastTypes as { type, code }}
				<Example {code} buttonVariant={type} onclick={() => showToast(type)} />
			{/each}
		</div>
	</section>

	<!-- Options -->
	<section>
		<h2>Toast Options</h2>
		<p>Customize toasts with descriptions, durations, and more.</p>

		<Example
			title="With Description"
			code={`toast.success('File uploaded', {
  description: 'Your file has been uploaded successfully.'
})`}
			buttonVariant="success"
			onclick={showWithDescription}
		/>

		<Example
			title="Custom Duration"
			description="Default is 4000ms. Set to Infinity for persistent toasts."
			code={`toast.info('This stays for 10 seconds', {
  duration: 10000
})`}
			buttonVariant="info"
			onclick={showCustomDuration}
		/>
	</section>

	<!-- Patterns -->
	<section>
		<h2>Patterns</h2>

		<Example
			title="Loading → Result"
			description="Show a loading toast, then update it to success/error by reusing the ID."
			code={`const id = toast.loading('Saving changes...')

// After async operation completes
toast.success('Changes saved!', { id })
// or
toast.error('Failed to save', { id })`}
			buttonText="Run (2s delay)"
			buttonVariant="pattern"
			onclick={showLoadingPattern}
		/>

		<Example
			title="Programmatic Dismiss"
			code={`// Dismiss by ID
const id = toast.loading('Processing...')
toast.dismiss(id)

// Dismiss all
toast.dismissAll()`}
		>
			<div class="button-row">
				<button class="loading" onclick={showPersistent}>Show Persistent</button>
				<button onclick={dismissPersistent} disabled={!persistentId}>Dismiss</button>
				<button class="dismiss" onclick={toast.dismissAll}>Dismiss All</button>
			</div>
		</Example>
	</section>

	<!-- Toaster Configuration -->
	<section>
		<h2>Toaster Configuration</h2>
		<p>Customize the Toaster component with these props. Try them out below!</p>

		<CodeBlock
			code={`<Toaster
  position="top-right"  // Position on screen
  theme="light"         // 'light' | 'dark'
  variant="rich"        // 'rich' | 'minimal'
  stack="vertical"      // 'vertical' | 'collapsed'
  max={5}               // Maximum toasts (oldest removed)
/>`}
		/>

		<div class="config-controls">
			{#each configOptions as { id, label, options }}
				<div class="control-group">
					<label for="{id}-select">{label}</label>
					<select
						id="{id}-select"
						value={getConfigValue(id)}
						onchange={(e) => setConfigValue(id, e.currentTarget.value)}
					>
						{#each options as opt}
							<option value={opt}>{opt}</option>
						{/each}
					</select>
				</div>
			{/each}
		</div>

		<div class="config-preview">
			<span class="label">Current:</span>
			<code>{`<Toaster position="${position}" theme="${theme}" variant="${variant}" stack="${stack}" />`}</code>
		</div>
	</section>

	<!-- API Reference -->
	<section>
		<h2>API Reference</h2>

		<h3>Toast Functions</h3>
		<ApiTable
			columns={[
				{ key: 'name', label: 'Function' },
				{ key: 'description', label: 'Description' }
			]}
			rows={toastFunctions}
		/>

		<h3>Toast Options</h3>
		<ApiTable
			columns={[
				{ key: 'option', label: 'Option' },
				{ key: 'type', label: 'Type' },
				{ key: 'description', label: 'Description' }
			]}
			rows={toastOptions}
		/>

		<h3>Toaster Props</h3>
		<ApiTable
			columns={[
				{ key: 'prop', label: 'Prop' },
				{ key: 'type', label: 'Type' },
				{ key: 'default', label: 'Default' },
				{ key: 'description', label: 'Description' }
			]}
			rows={toasterProps}
		/>
	</section>

	<!-- CSS Customization -->
	<section>
		<h2>CSS Customization</h2>
		<p>Override CSS variables to customize the appearance.</p>

		<CodeBlock
			code={`:root {
  --svt-font-family: system-ui, sans-serif;
  --svt-border-radius: 8px;
  --svt-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  --svt-padding: 12px 16px;
  --svt-gap: 12px;
  --svt-z-index: 9999;
  --svt-max-width: 360px;
  --svt-min-width: 280px;

  /* Colors */
  --svt-bg: #ffffff;
  --svt-color: #1a1a1a;
  --svt-border: #e5e5e5;
  --svt-success-bg: #ecfdf5;
  --svt-success-color: #065f46;
  /* ... and more */
}`}
		/>
	</section>

	<footer>
		<p>
			<a href="https://www.npmjs.com/package/svelte5-toaster">npm</a> ·
			<a href="https://github.com/Aron-Lomner/svelte5-toaster">GitHub</a>
		</p>
		<p>MIT License · Developed by <a href="https://www.aronlomner.com/">Aron Lomner</a></p>
	</footer>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, sans-serif;
		line-height: 1.6;
	}

	.docs {
		max-width: 900px;
		margin: 0 auto;
		padding: 40px 24px;
		color: #1a1a1a;
	}

	.docs.dark {
		background: #0a0a0a;
		color: #f5f5f5;
		min-height: 100vh;
	}

	/* Hero */
	.hero {
		text-align: center;
		margin-bottom: 48px;
		padding-bottom: 32px;
		border-bottom: 1px solid #e5e5e5;
	}

	.dark .hero {
		border-color: #333;
	}

	.hero h1 {
		font-size: 2.5rem;
		margin: 0 0 8px;
		font-weight: 700;
	}

	.tagline {
		color: #666;
		font-size: 1.1rem;
		margin: 0;
	}

	.dark .tagline {
		color: #999;
	}

	/* Sections */
	section {
		margin-bottom: 48px;
	}

	h2 {
		font-size: 1.5rem;
		margin: 0 0 16px;
		padding-bottom: 8px;
		border-bottom: 2px solid #e5e5e5;
	}

	.dark h2 {
		border-color: #333;
	}

	h3 {
		font-size: 1.1rem;
		margin: 24px 0 12px;
	}

	p {
		margin: 0 0 16px;
	}

	code {
		font-family: 'SF Mono', Consolas, monospace;
		font-size: 0.875em;
	}

	p code {
		background: #f0f0f0;
		padding: 2px 6px;
		border-radius: 4px;
	}

	.dark p code {
		background: #262626;
	}

	/* Example grid */
	.example-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 16px;
	}

	/* Buttons */
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

	.dark button {
		background: #333;
		color: #f5f5f5;
	}

	button:hover:not(:disabled) {
		transform: translateY(-1px);
	}

	button:active:not(:disabled) {
		transform: translateY(0);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	button.loading {
		background: #6b7280;
		color: white;
	}

	button.dismiss {
		background: #1a1a1a;
		color: white;
	}

	.dark button.dismiss {
		background: #555;
	}

	.button-row {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	/* Config controls */
	.config-controls {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin: 16px 0;
	}

	.control-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.control-group label {
		font-size: 12px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #666;
	}

	.dark .control-group label {
		color: #999;
	}

	select {
		padding: 8px 12px;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 14px;
		min-width: 140px;
		background: white;
	}

	.dark select {
		background: #1a1a1a;
		border-color: #444;
		color: #f5f5f5;
	}

	.config-preview {
		background: #f5f5f5;
		padding: 12px 16px;
		border-radius: 8px;
		font-size: 0.875rem;
		overflow-x: auto;
	}

	.dark .config-preview {
		background: #1a1a1a;
	}

	.config-preview .label {
		color: #666;
		margin-right: 8px;
	}

	.dark .config-preview .label {
		color: #999;
	}

	/* Footer */
	footer {
		text-align: center;
		padding-top: 32px;
		border-top: 1px solid #e5e5e5;
		color: #999;
		font-size: 0.9rem;
	}

	footer a {
		color: #666;
		text-decoration: none;
	}

	footer a:hover {
		text-decoration: underline;
	}

	.dark footer {
		border-color: #333;
	}

	.dark footer a {
		color: #aaa;
	}
</style>
