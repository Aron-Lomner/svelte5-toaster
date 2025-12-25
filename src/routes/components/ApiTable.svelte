<script lang="ts">
	type Column = {
		key: string
		label: string
	}

	type Props = {
		columns: Column[]
		rows: Record<string, string>[]
	}

	let { columns, rows }: Props = $props()
</script>

<div class="api-table">
	<table>
		<thead>
			<tr>
				{#each columns as col}
					<th>{col.label}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					{#each columns as col}
						<td>
							{#if col.key === 'name' || col.key === 'prop' || col.key === 'option'}
								<code>{row[col.key]}</code>
							{:else}
								{row[col.key]}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.api-table {
		overflow-x: auto;
		margin-bottom: 24px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	th,
	td {
		text-align: left;
		padding: 10px 12px;
		border-bottom: 1px solid #e5e5e5;
	}

	:global(.dark) th,
	:global(.dark) td {
		border-color: #333;
	}

	th {
		font-weight: 600;
		background: #f9f9f9;
	}

	:global(.dark) th {
		background: #1a1a1a;
	}

	code {
		font-family: 'SF Mono', Consolas, monospace;
		font-size: 0.875em;
		background: #f0f0f0;
		padding: 2px 6px;
		border-radius: 4px;
	}

	:global(.dark) code {
		background: #262626;
	}
</style>
