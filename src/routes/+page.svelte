<script lang="ts">
	import { all_timers, verify_url } from '$lib/globals.svelte';
	import { onMount } from 'svelte';
	import TimerCard from '$lib/TimerCard.svelte';
	import { goto } from '$app/navigation';

	var name: string = $state('');
	var minutes: number = $state(15);

	function handleTimer(event: SubmitEvent) {
		event.preventDefault()
		const formatted_name = verify_url(name)
		goto(`/share/${formatted_name}/${minutes}`);
		document.getElementById("timer-name")?.focus()
	}

	async function requestNotif() {
		await Notification.requestPermission().then((result) => {
			if (result === "granted") {
				new Notification('TimerZ', {
					body: 'Notifications enabled!'
				});
			}
		});
	}

	onMount(() => {
		if (Notification.permission === 'default') {
			Notification.requestPermission();
		}
		const handleVisibilityChange = () => {
			if (
				document.visibilityState === 'hidden' &&
				Notification.permission === 'granted' &&
				Object.keys(all_timers).length > 0
			) {
				new Notification('TimerZ', {
					body: 'Your timers are still running in the background as long as TimerZ is open.'
				});
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	});
</script>

<svelte:head>
	<title>TimerZ</title>
</svelte:head>

<div class="container">
	<header class="app-header">
		<h1 class="app-title">TimerZ</h1>
		<p class="app-subtitle">
			Made by <a
				class="creator-name"
				href="https://github.com/JOwen-ster"
				rel="noopener noreferrer"
				target="_blank">Owen Sterling</a
			>
		</p>
	</header>

	<div class=""></div>
	<div class="timer-form-container">
		<form class="timer-form" onsubmit={handleTimer}>
			<div class="form-group">
				<label for="timer-name">Timer Name</label>
				<input
					id="timer-name"
					required
					type="text"
					bind:value={name}
					placeholder="Enter timer name"
					class="form-input"
				/>
			</div>

			<div class="form-group">
				<label for="timer-minutes">Minutes</label>
				<input
					id="timer-minutes"
					required
					type="number"
					min="1"
					bind:value={minutes}
					placeholder="Enter minutes"
					class="form-input"
				/>
			</div>

			<button type="submit" class="start-btn">
				<span>🚀</span>Create Timer
			</button>
		</form>
	</div>

	<button onclick={requestNotif}>
		Enable Notifications
	</button>

	<div class="timers-container">
		{#if Object.keys(all_timers).length === 0}
			<div class="empty-state">
				<div class="empty-icon">⏰</div>
				<h3>No timers running</h3>
			</div>
		{:else}
			{#each Object.values(all_timers) as timer}
				<TimerCard {timer} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.container {
		margin: 0;
		padding: 20px;
	}

	.app-header {
		text-align: center;
		margin-bottom: 32px;
	}

	.app-title {
		color: #f9fafb;
	}

	.app-subtitle {
		color: #6b7280;
		font-size: 1rem;
		margin: 0;
		font-weight: 500;
	}

	.creator-name {
		color: #0077cc;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.creator-name:hover {
		color: #005fa3;
		text-decoration: underline;
	}

	.timer-form-container {
		background: linear-gradient(145deg, #1f2937, #111827);
		border-color: rgba(75, 85, 99, 0.8);
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(226, 232, 240, 0.8);
	}

	.timer-form {
		display: grid;
		grid-template-columns: 1fr .1fr auto auto;
		gap: 16px;
		align-items: end;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-group label {
		font-size: 0.875rem;
		font-weight: 600;
		color: #d1d5db;
		margin-bottom: 6px;
	}

	.form-input {
		padding: 12px 16px;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.2s ease;
		background: #374151;
		border-color: #4b5563;
		color: #f9fafb;
	}

	.form-input:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
		border-color: #60a5fa;
	}

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

	.timers-container {
		margin-top: 24px;
	}

	.empty-state {
		text-align: center;
		padding: 48px 24px;
		color: #d1d5db;
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: 16px;
	}

	.empty-state h3 {
		font-size: 1.5rem;
		margin: 0 0 8px 0;
		color: #374151;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.app-title {
			font-size: 2rem;
		}

		.timer-form-container {
			padding: 20px;
		}

		.timer-form {
			grid-template-columns: 1fr;
			gap: 20px;
		}
	}
</style>
