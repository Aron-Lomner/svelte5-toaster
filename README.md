# svelte5-toaster

A lightweight, customizable toast notification library for Svelte 5.

## Installation

```bash
npm install svelte5-toaster
```

## Quick Start

Add the `Toaster` component to your root layout:

```svelte
<!-- +layout.svelte -->
<script>
  import { Toaster } from 'svelte5-toaster'
</script>

<Toaster />
<slot />
```

Then use the `toast` API anywhere:

```svelte
<script>
  import { toast } from 'svelte5-toaster'
</script>

<button onclick={() => toast.success('Hello!')}>
  Show Toast
</button>
```

## Toast Types

```javascript
toast.default('Default message')
toast.success('Success message')
toast.error('Error message')
toast.warning('Warning message')
toast.info('Info message')
toast.loading('Loading...')
```

## Toast Options

All toast functions accept an optional second argument:

```javascript
toast.success('File uploaded', {
  description: 'Your file has been uploaded successfully.',
  duration: 5000,    // milliseconds (default: 4000)
  id: 'custom-id',   // useful for updating toasts
})
```

| Option | Type | Description |
|--------|------|-------------|
| `id` | `string` | Custom ID for updating/dismissing specific toasts |
| `description` | `string` | Secondary text below the title |
| `duration` | `number` | Auto-dismiss delay in ms (default: 4000, use `Infinity` for persistent) |
| `icon` | `Component` | Custom Svelte component for the icon |

## Updating Toasts

Reuse an ID to update an existing toast:

```javascript
const id = toast.loading('Saving...')

// After async operation
toast.success('Saved!', { id })
// or
toast.error('Failed to save', { id })
```

## Dismissing Toasts

```javascript
// Dismiss specific toast
const id = toast.loading('Processing...')
toast.dismiss(id)

// Dismiss all toasts
toast.dismissAll()
```

## Toaster Configuration

Customize the `Toaster` component with props:

```svelte
<Toaster
  position="top-right"
  theme="light"
  variant="rich"
  stack="vertical"
  max={5}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `ToastPosition` | `'top-right'` | Screen position |
| `theme` | `'light' \| 'dark'` | `'light'` | Color theme |
| `variant` | `'rich' \| 'minimal'` | `'rich'` | Visual style |
| `stack` | `'vertical' \| 'collapsed'` | `'vertical'` | Stacking behavior |
| `max` | `number` | `5` | Maximum toasts (oldest are removed) |

### Positions

`'top-left'` | `'top-center'` | `'top-right'` | `'center-left'` | `'center'` | `'center-right'` | `'bottom-left'` | `'bottom-center'` | `'bottom-right'`

## CSS Customization

Override CSS variables to customize the appearance:

```css
:root {
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

  /* Type-specific colors */
  --svt-success-bg: #ecfdf5;
  --svt-success-color: #065f46;
  --svt-error-bg: #fef2f2;
  --svt-error-color: #991b1b;
  --svt-warning-bg: #fffbeb;
  --svt-warning-color: #92400e;
  --svt-info-bg: #eff6ff;
  --svt-info-color: #1e40af;
}
```

## TypeScript

All types are exported:

```typescript
import type {
  ToastPosition,
  ToastVariant,
  ToastTheme,
  ToastStack,
  ToastOptions,
  ToastType,
} from 'svelte5-toaster'
```

## License

MIT - Developed by [Aron Lomner](https://www.aronlomner.com/)
