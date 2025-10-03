// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type Timer = {
		name: string;
		maxTime: number;
		timeLeft: number;
		isPaused: boolean;
		intervalId?: number;
		startTime?: number;
	}

	interface TimerCardProps {
		timer: Timer;
	};
};

export {};
