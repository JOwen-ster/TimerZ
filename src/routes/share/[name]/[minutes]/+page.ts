import { redirect } from '@sveltejs/kit';
import { all_timers } from '$lib/globals.svelte.js';

export const load = (async ({ params }) => {
	const casted_minutes = Number(params.minutes);

	// validate inputs

	// TODO: MAKE THE LANDING PAGE NOT USE THIS ROUTE, IT SHOULD ONLY BE FOR SHARING
	// TODO: FIX THE TYPES / MIGRATE TO NEW REPO
	// TODO: USE LOCAL STORAGE SO TIMERS WILL APPEAR ACCROSS ALL TABS WHEN CLICKING A SHARE LINK INSTEAD OF OPENING A NEW TAB WHICH CLEARS THE STATE
	// TODO: MIGRATE TO CSS VARS OR TAILWIND

	// invalid -> redirect home
	if (!Number.isInteger(casted_minutes) || params.name in all_timers) {
		// invalid → redirect home
		throw redirect(302, '/')
	}

	// valid -> load data to page
	return {
		name: params.name,
		minutes: casted_minutes
	};
});
