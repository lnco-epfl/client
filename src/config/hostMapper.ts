import { Platform, defaultHostsMapper } from '@graasp/ui';

import { GRAASP_BUILDER_HOST, GRAASP_LIBRARY_HOST } from './env';

export const platformsHostsMap = defaultHostsMapper({
  [Platform.Builder]: GRAASP_BUILDER_HOST,
  [Platform.Player]: '/player',
  [Platform.Library]: GRAASP_LIBRARY_HOST,
  [Platform.Analytics]: '/analytics',
});
