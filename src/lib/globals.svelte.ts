export const all_timers: Record<string, Timer> = $state({});

export function display_notification(message: string) {
	if (!("Notification" in window)) {
		console.warn("Notifications not supported");
		return;
	}

	if (Notification.permission === "granted") {
		try {
			new Notification("TimerZ", { body: message });
		} catch (err) {
			console.warn("Notification error:", err);
		}
	} else {
		console.log("Notification skipped, permission =", Notification.permission);
	}
}

// Update timer based on actual elapsed time
function updateTimer(timer: Timer) {
	if (timer.isPaused || !timer.startTime) {
		return;
	}

	const now = Date.now();
	const elapsed = Math.floor((now - timer.startTime) / 1000);
	const newTimeLeft = Math.max(0, timer.maxTime - elapsed);

	if (newTimeLeft !== timer.timeLeft) {
		timer.timeLeft = newTimeLeft;

		// Timer finished
		if (newTimeLeft === 0 && timer.intervalId) {
			clearInterval(timer.intervalId);
			timer.intervalId = undefined;
			if (Object.keys(all_timers).length > 0) {
				display_notification(`The ${timer.name} timer has ended!`);
			}
		}
	}
}

export function startCountdown(timer: Timer) {
	// Set start time based on current timeLeft
	// This accounts for paused timers being resumed
	const elapsedSeconds = timer.maxTime - timer.timeLeft;
	timer.startTime = Date.now() - (elapsedSeconds * 1000);

	return setInterval(() => {
		updateTimer(timer);
	}, 100);
}

// Recalculate all active timers (call this on visibility change)
export function recalculateAllTimers() {
	Object.values(all_timers).forEach(timer => {
		if (!timer.isPaused && timer.timeLeft > 0 && timer.startTime) {
			updateTimer(timer);
		}
	});
}

function verify_name(name: string) {
	return encodeURIComponent(
		name.trim().replace(/ /g, "-")
	);
}

export function generate_timer(raw_name: string, minutes: number) {
	const formatted_name = verify_name(raw_name);
	const casted_minutes = Number(minutes);
	
	if (Number.isInteger(casted_minutes) && !(formatted_name in all_timers)) {
		const newTimer: Timer = $state({
			name: formatted_name,
			maxTime: casted_minutes * 60,
			timeLeft: casted_minutes * 60,
			isPaused: false,
			startTime: Date.now()
		});
		
		newTimer.intervalId = startCountdown(newTimer);
		all_timers[formatted_name] = newTimer;
	}
}