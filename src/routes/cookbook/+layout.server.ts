import { redirect } from '@sveltejs/kit';
import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import type { LayoutServerLoad } from './$types';

export const load = wrapServerLoadWithSentry(async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/signin');
}) satisfies LayoutServerLoad;