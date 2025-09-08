export const all_timers: Record<string, Timer> = $state({});

export function startCountdown(timer: Timer) {
	return setInterval(() => {
		if (timer.timeLeft > 0) {
			timer.timeLeft -= 1; // directly reactive
		} else {
			clearInterval(timer.intervalId);
			timer.timeLeft = 0;
			if (
				Notification.permission === 'granted' &&
				Object.keys(all_timers).length > 0
			) {
			new Notification('TimerZ', {
				body: `${timer.name} has ended!`
				// tag: timerz-background, // makes this notification get edited, a new one wont be created when triggering the event
			});
			}
		}
	}, 1000);
}
