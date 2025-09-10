<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { all_timers, startCountdown } from '$lib/globals.svelte';

	let { data } = $props();

	onMount(() => {
		// create the timer first
		let newTimer: Timer = $state({
			name: data.name,
			maxTime: data.minutes * 60,
			timeLeft: data.minutes * 60
		});
		newTimer.intervalId = startCountdown(newTimer);

		all_timers[data.name] = newTimer;

		// fire notification if allowed
		if ("Notification" in window && Notification.permission === "granted") {
			new Notification("TimerZ", {
				body: `Timer "${data.name}" set for ${data.minutes} minutes.`
			});
		}

		setTimeout(() => {
			goto("/");
		}, 1000);
	});
</script>

<h1>Creating timer "{data.name}" for {data.minutes} minutes...</h1>

<style>
    h1 {
        color: #f9fafb;
    }
</style>
