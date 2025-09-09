<script lang="ts">
    import type { PageProps } from './$types';
    import { all_timers, startCountdown } from '$lib/globals.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let { data }: PageProps = $props();

    onMount(async () => {
        // wrap each timer in $state
        let newTimer: Timer = $state({
            name: data.name,
            maxTime: data.minutes * 60,
            timeLeft: data.minutes * 60
        });
        newTimer.intervalId = startCountdown(newTimer);

        all_timers[data.name] = newTimer;

        if ("Notification" in window) {
            if (Notification.permission === "default") {
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                    new Notification("TimerZ", {
                        body: `Timer "${data.name}" set for ${data.minutes} minutes.`
                    });
                }
            } else if (Notification.permission === "granted") {
                new Notification("TimerZ", {
                    body: `Timer "${data.name}" set for ${data.minutes} minutes.`
                });
            }
        }

        goto("/");
    });
</script>
