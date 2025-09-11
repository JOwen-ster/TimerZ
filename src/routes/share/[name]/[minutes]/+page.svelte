<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { display_notification, generate_timer } from '$lib/globals.svelte';


	let { data } = $props();

	onMount(() => {
		generate_timer(data.name, data.minutes);
		display_notification(`Set ${data.name} for ${data.minutes} minutes.`)
		goto("/");
	});
</script>

<!-- <h1 class="loading-text">Creating timer "{data.name}" for {data.minutes} minutes...</h1>

<style>
	.loading-text {
		color: antiquewhite;
	}
</style> -->