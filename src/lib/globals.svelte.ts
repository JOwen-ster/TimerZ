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
					body: `The ${timer.name} timer has ended!`
				});
			}
		}
	}, 1000);
}

export function verify_url(url: string) {
	return encodeURIComponent(
		url.trim().replace(/ /g, "-")
	);
}
