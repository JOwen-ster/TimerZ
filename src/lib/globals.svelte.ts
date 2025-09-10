export const all_timers: Record<string, Timer> = $state({});

export function display_notification(message: string) {
	if ("Notification" in window && Notification.permission === "granted") {
		new Notification("TimerZ", {
			body: message
		});
	}
}

export function startCountdown(timer: Timer) {
	return setInterval(() => {
		if ( timer.timeLeft > 0 ) {
			timer.timeLeft -= 1; // directly reactive
		} else {
			clearInterval(timer.intervalId);
			timer.timeLeft = 0;
			if ( Object.keys(all_timers).length > 0 ) {
				display_notification(`The ${timer.name} timer has ended!`)
			}
		}
	}, 1000);
}

function verify_name(name: string) {
	return encodeURIComponent(
		name.trim().replace(/ /g, "-")
	);
}

export function generate_timer(raw_name: string, minutes: number) {
	const formatted_name = verify_name(raw_name)
	const casted_minutes = Number(minutes);
	if (Number.isInteger(casted_minutes) || !(formatted_name in all_timers)) {
		const newTimer: Timer = $state({
			name: formatted_name,
			maxTime: casted_minutes * 60,
			timeLeft: casted_minutes * 60
		});
		newTimer.intervalId = startCountdown(newTimer);

		all_timers[formatted_name] = newTimer;
	} 
}