import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const formatted_name = params.name.replace(/ /g, "-");
	const casted_minutes = Number(params.minutes);

	// validate inputs
	if (!Number.isInteger(casted_minutes) || casted_minutes <= 0) {
		// invalid → redirect home
		throw redirect(302, '/');
	}

	// valid → pass values to page
	return {
		name: formatted_name,
		minutes: casted_minutes
	};
}) satisfies PageLoad;
