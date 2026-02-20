<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<div
	class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent {className}"
	role="status"
>
	<span class="sr-only">Loading...</span>
</div>
