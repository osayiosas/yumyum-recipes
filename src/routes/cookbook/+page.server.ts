import { redirect } from '@sveltejs/kit';
import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import { Logger } from '$lib/services/log';
import { getRecipes } from '$lib/services/recipe';
import type { PageServerLoad } from './$types';
import { ApiError } from '$lib/error';

export const load = wrapServerLoadWithSentry(async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/signin');
  
  try {
    const [recipes] = await Promise.all([
      getRecipes(locals.user),
    ]);
    return { recipes };
  } catch (err) {
    const error = err instanceof ApiError
      ? new ApiError(err.message, err.status, err.field)
      : new ApiError('An error has occurred.', 500);

    Logger.error('Error getting recipes: ', err);
    
    return { error: error.toJSON() };
  }
}) satisfies PageServerLoad;