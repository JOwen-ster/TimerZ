<script lang="ts">
	let { data } = $props();
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { generate_timer, display_notification } from '$lib/globals.svelte';


	onMount(() => {
		generate_timer(data.name, data.minutes)

		display_notification(`Set ${data.name} for ${data.minutes} minutes.`)

		// setTimeout(() => {
		// 	goto("/");
		// }, 1000);
	});
</script>

<h1>Creating timer "{data.name}" for {data.minutes} minutes...</h1>
<a href="/">test</a>

<style>
    h1 {
        color: #f9fafb;
    }
</style>
