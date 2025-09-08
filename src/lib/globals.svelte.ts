export const all_timers: Record<string, Timer> = $state({});

export function startCountdown(timer: Timer) {
	return setInterval(() => {
		if (timer.timeLeft > 0) {
			timer.timeLeft -= 1; // directly reactive
		} else {
			clearInterval(timer.intervalId);
			timer.timeLeft = 0;
		}
	}, 1000);
}
