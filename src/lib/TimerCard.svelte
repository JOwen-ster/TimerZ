<script lang="ts">
	let { timer }: TimerCardProps = $props();
	import { all_timers, display_notification, startCountdown } from './globals.svelte';


	let togglePauseOn = $state(false);

	function removeTimer(name: string) {
		let found_timer = all_timers[name];
		if (found_timer?.intervalId) clearInterval(found_timer.intervalId);

		delete all_timers[name];
		display_notification(`${name} was removed.`)
	}

	function pauseTimer(name: string) {
		let found_timer = all_timers[name];
		togglePauseOn = !togglePauseOn;
		if (togglePauseOn) {
			if (found_timer?.intervalId) clearInterval(found_timer.intervalId);
		} else {
			found_timer.intervalId = startCountdown(found_timer);
		}
	}

	function formatTime(seconds: number): string {
		const days = Math.floor(seconds / (24 * 3600));
		seconds %= 24 * 3600;

		const hours = Math.floor(seconds / 3600);
		seconds %= 3600;

		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;

		const parts = [];
		if (days > 0) parts.push(String(days).padStart(2, '0'));
		if (days > 0 || hours > 0) parts.push(String(hours).padStart(2, '0'));
		parts.push(String(mins).padStart(2, '0'));
		parts.push(String(secs).padStart(2, '0'));

		return parts.join(':');
	}

	function getProgressPercentage() {
		return timer.timeLeft <= 0 ? 0 : Math.round((timer.timeLeft / timer.maxTime) * 100);
	}

	function getStatusClass() {
		switch (true) {
			case timer.timeLeft === 0:
				return 'finished';
			case timer.timeLeft / timer.maxTime <= 0.1:
				return 'critical';
			case timer.timeLeft / timer.maxTime <= 0.5:
				return 'warning';
			default:
				return 'active';
		}
	}
</script>

<div class="timer-card {getStatusClass()}">
	<div class="timer-header">
		<h3 class="timer-name">{timer.name}</h3>
		<div class="timer-time {timer.timeLeft === 0 ? 'finished' : ''}">
			{formatTime(timer.timeLeft)}
		</div>
	</div>

	<div class="timer-progress">
		<div class="progress-bar" style="width: {getProgressPercentage()}%"></div>
	</div>

	<div class="timer-actions">
		{#if timer.timeLeft === 0}
			<span class="status-text">⏰ Time's up!</span>
		{:else}
			<span class="status-text">⏳ Running...</span>

			<button class="pause-btn" onclick={() => pauseTimer(timer.name)}>
				{#if togglePauseOn}
					Unpause
				{:else}
					Pause
				{/if}
			</button>
		{/if}

		<button class="remove-btn" onclick={() => removeTimer(timer.name)}>
			<span class="remove-icon">✕</span>
			Remove
		</button>
	</div>
</div>

<style>
	.timer-card {
		background: linear-gradient(145deg, #ffffff, #f8f9fa);
		border-radius: 16px;
		padding: 24px;
		margin: 16px 0;
		box-shadow:
			0 4px 12px rgba(0, 0, 0, 0.1),
			0 2px 4px rgba(0, 0, 0, 0.06);
		border: 1px solid rgba(226, 232, 240, 0.8);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.timer-card.active {
		border-left: 4px solid #10b981;
	}

	.timer-card.warning {
		border-left: 4px solid #f59e0b;
		background: linear-gradient(145deg, #fffbeb, #fef3c7);
	}

	.timer-card.critical {
		border-left: 4px solid #ef4444;
		background: linear-gradient(145deg, #fef2f2, #fecaca);
		animation: pulse-critical 2s infinite;
	}

	.timer-card.finished {
		border-left: 4px solid #6b7280;
		background: linear-gradient(145deg, #f9fafb, #e5e7eb);
	}

	@keyframes pulse-critical {
		0%,
		100% {
			box-shadow:
				0 4px 12px rgba(0, 0, 0, 0.1),
				0 2px 4px rgba(239, 68, 68, 0.2);
		}
		50% {
			box-shadow:
				0 4px 12px rgba(0, 0, 0, 0.1),
				0 2px 8px rgba(239, 68, 68, 0.4);
		}
	}

	.timer-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}

	.timer-name {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0;
		line-height: 1.2;
		flex: 1;
		margin-right: 16px;
	}

	.timer-time {
		font-family: 'Courier New', monospace;
		font-size: 1.5rem;
		font-weight: bold;
		color: #059669;
		background: rgba(16, 185, 129, 0.1);
		padding: 8px 16px;
		border-radius: 8px;
		min-width: 80px;
		text-align: center;
		transition: all 0.3s ease;
	}

	.timer-time.finished {
		color: #dc2626;
		background: rgba(220, 38, 38, 0.1);
	}

	.timer-progress {
		width: 100%;
		height: 6px;
		background: rgba(156, 163, 175, 0.3);
		border-radius: 3px;
		margin-bottom: 16px;
		overflow: hidden;
	}

	.progress-bar {
		height: 100%;
		background: linear-gradient(90deg, #10b981, #059669);
		border-radius: 3px;
		transition:
			width 0.3s ease,
			background-color 0.3s ease;
	}

	.critical .progress-bar {
		background: linear-gradient(90deg, #ef4444, #dc2626);
	}

	.warning .progress-bar {
		background: linear-gradient(90deg, #f59e0b, #d97706);
	}

	.finished .progress-bar {
		background: linear-gradient(90deg, #6b7280, #4b5563);
		width: 0% !important;
	}

	.timer-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.status-text {
		font-size: 0.875rem;
		color: #6b7280;
		font-weight: 500;
	}

	.remove-btn {
		background: linear-gradient(145deg, #ef4444, #dc2626);
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 6px;
		transition: all 0.2s ease;
		box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
	}

	.remove-btn:hover {
		background: linear-gradient(145deg, #dc2626, #b91c1c);
		transform: translateY(-1px);
		box-shadow: 0 4px 8px rgba(239, 68, 68, 0.4);
	}

	.remove-btn:active {
		transform: translateY(0);
		box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
	}

	.remove-icon {
		font-size: 0.75rem;
		font-weight: bold;
	}

	.pause-btn {
		background: linear-gradient(145deg, #f7d23b, #f5c400);
		color: #222;
		border: none;
		padding: 8px 16px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 6px;
		transition: all 0.2s ease;
		box-shadow: 0 2px 4px rgba(245, 196, 0, 0.4);
	}

	.pause-btn:hover {
		background: linear-gradient(145deg, #f9db57, #f7ce15);
		transform: translateY(-1px);
		box-shadow: 0 4px 6px rgba(245, 196, 0, 0.5);
	}

	.pause-btn:active {
		background: linear-gradient(145deg, #f5c400, #e0ad00);
		transform: translateY(1px);
		box-shadow: 0 1px 3px rgba(245, 196, 0, 0.4);
	}

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.timer-card {
			background: linear-gradient(145deg, #1f2937, #111827);
			border-color: rgba(75, 85, 99, 0.8);
			color: #f9fafb;
		}

		.timer-card.warning {
			background: linear-gradient(145deg, #451a03, #78350f);
		}

		.timer-card.critical {
			background: linear-gradient(145deg, #450a0a, #7f1d1d);
		}

		.timer-card.finished {
			background: linear-gradient(145deg, #374151, #1f2937);
		}

		.timer-name {
			color: #f9fafb;
		}

		.status-text {
			color: #9ca3af;
		}
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.timer-card {
			padding: 20px;
			margin: 12px 0;
		}

		.timer-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
		}

		.timer-name {
			margin-right: 0;
			font-size: 1.1rem;
		}

		.timer-time {
			font-size: 1.25rem;
			align-self: flex-end;
		}

		.timer-actions {
			flex-direction: column;
			gap: 12px;
			align-items: stretch;
		}

		.remove-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
