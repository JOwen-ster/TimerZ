<script lang="ts">
	import { goto } from "$app/navigation";
	import { all_timers } from "./globals.svelte";

    let {
        name,
		minutes
    } = $props()

	function handleRedirect() {
		const formatted_name: string = name.replace(/ /g, "-");
		const casted_minutes = Number(minutes);
	
		if (!Number.isInteger(casted_minutes) || casted_minutes <= 0  || formatted_name === "") {
			if (
				Notification.permission === 'granted' &&
				!(formatted_name in all_timers)
			) {
				new Notification('TimerZ', {
					body: 'Please specify a timer name and whole number minute value greater than 0.'
				});
			}
		} else {
			goto(`/create/${formatted_name}/${casted_minutes}`)
		}
	}
</script>

<button class="start-btn" onclick={handleRedirect}>
	<span class="btn-icon">🚀</span>
	Generate Timer
</button>


<style>
	.start-btn {
		background: linear-gradient(145deg, #3b82f6, #2563eb);
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 8px;
		transition: all 0.2s ease;
		box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
		height: fit-content;
	}

	.start-btn:hover {
		background: linear-gradient(145deg, #2563eb, #1d4ed8);
		transform: translateY(-1px);
		box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
	}

	.start-btn:active {
		transform: translateY(0);
	}
</style>