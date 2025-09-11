<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { generate_timer, display_notification } from '$lib/globals.svelte';


	let { data } = $props();

	onMount(() => {
		generate_timer(data.name, data.minutes);

		try {
			display_notification(`Set ${data.name} for ${data.minutes} minutes.`);
		} catch (err) {
			console.warn("Notification failed", err);
		}

		goto("/");
	});
</script>

<h1 class="loading-text">Creating timer "{data.name}" for {data.minutes} minutes...</h1>

<style>
	.loading-text {
		color: antiquewhite;
	}
</style>