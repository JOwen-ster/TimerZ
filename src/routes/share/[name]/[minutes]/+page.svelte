<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { all_timers, startCountdown } from '$lib/globals.svelte';

    let { data } = $props();

    onMount(() => {
        let newTimer: Timer = $state({
            name: data.name,
            maxTime: data.minutes * 60,
            timeLeft: data.minutes * 60
        });
        newTimer.intervalId = startCountdown(newTimer);

        all_timers[data.name] = newTimer;

        if ("Notification" in window) {
            if (Notification.permission === "granted") {
                new Notification("TimerZ", {
                    body: `Timer "${data.name}" set for ${data.minutes} minutes.`
                });
            }
        }

        setTimeout(() => {
            goto("/");
        }, 100); // wait for js to load
    });
</script>

<h1>Loading...</h1>
