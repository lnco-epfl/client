import { Platform, defaultHostsMapper } from '@graasp/ui';

import { GRAASP_BUILDER_HOST, GRAASP_PLAYER_HOST } from './env';

export const platformsHostsMap = defaultHostsMapper({
  [Platform.Builder]: GRAASP_BUILDER_HOST,
  [Platform.Player]: GRAASP_PLAYER_HOST,
  [Platform.Analytics]: '/analytics',
});
