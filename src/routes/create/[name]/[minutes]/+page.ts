import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const casted_minutes = Number(params.minutes);

	// validate inputs

	// invalid -> redirect home
	if (!Number.isInteger(casted_minutes)) {
		// invalid → redirect home
		throw redirect(302, '/')
	}

	// valid -> load data to page
	return {
		name: params.name,
		minutes: casted_minutes
	};
}) satisfies PageLoad;
