<script lang="ts">
	import { all_timers, startCountdown } from '$lib/globals.svelte';
	import TimerCard from '$lib/TimerCard.svelte';

	var name: string = $state('');
	var minutes: number = $state(15);

	function addTimer(event: SubmitEvent) {
		event.preventDefault();
		if (name in all_timers || minutes <= 0) return;

		// wrap each timer in $state
		let newTimer: Timer = $state({
			name,
			maxTime: minutes * 60,
			timeLeft: minutes * 60
		});
		newTimer.intervalId = startCountdown(newTimer);

		all_timers[name] = newTimer;

		name = '';
		document.getElementById('timer-name')?.focus();
	}
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

	<div class="timer-form-container">
		<form class="timer-form" onsubmit={addTimer}>
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
					bind:value={minutes}
					placeholder="Enter minutes"
					class="form-input"
				/>
			</div>

			<button type="submit" class="start-btn">
				<span class="btn-icon">🚀</span>
				Start Timer
			</button>
		</form>
	</div>

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
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 8px 0;
		color: #111;
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
		background: linear-gradient(145deg, #ffffff, #f8f9fa);
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(226, 232, 240, 0.8);
	}

	.timer-form {
		display: grid;
		grid-template-columns: 1fr 120px auto;
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
		color: #374151;
		margin-bottom: 6px;
	}

	.form-input {
		padding: 12px 16px;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.2s ease;
		background: white;
	}

	.form-input:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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

	.btn-icon {
		font-size: 1.1rem;
	}

	.timers-container {
		margin-top: 24px;
	}

	.empty-state {
		text-align: center;
		padding: 48px 24px;
		color: #6b7280;
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

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.container {
			background: #111827;
		}

		.app-title {
			color: #f9fafb;
		}

		.timer-form-container {
			background: linear-gradient(145deg, #1f2937, #111827);
			border-color: rgba(75, 85, 99, 0.8);
		}

		.form-group label {
			color: #d1d5db;
		}

		.form-input {
			background: #374151;
			border-color: #4b5563;
			color: #f9fafb;
		}

		.form-input:focus {
			border-color: #60a5fa;
		}

		.empty-state h3 {
			color: #d1d5db;
		}
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

		.start-btn {
			justify-content: center;
		}
	}
</style>
