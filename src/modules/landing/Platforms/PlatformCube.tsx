import { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import {
  AnalyticsIcon,
  BuildIcon,
  Platform,
  PlayIcon,
} from '@graasp/ui';

import { NS } from '@/config/constants';
import {
  GRAASP_BUILDER_HOST,
  GRAASP_PLAYER_HOST,
} from '@/config/env';

import { PlatformColorSurface } from './PlatformColorSurface';

function Row({ children }: { children: ReactNode }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} gap="2px">
      {children}
    </Stack>
  );
}

export function PlatformCube() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'HOME.PUZZLE' });
  const PlatformProps = {
    [Platform.Builder]: {
      Icon: BuildIcon,
      color: Platform.Builder,
      text: <Trans t={t} i18nKey="BUILDER.DESCRIPTION" />,
      button: {
        text: t('BUILDER.BUTTON_TEXT'),
        href: GRAASP_BUILDER_HOST,
      },
    },
    [Platform.Player]: {
      Icon: PlayIcon,
      color: Platform.Player,
      text: <Trans t={t} i18nKey="PLAYER.DESCRIPTION" />,
      button: {
        text: t('PLAYER.BUTTON_TEXT'),
        href: GRAASP_PLAYER_HOST,
      },
    },
    [Platform.Analytics]: {
      Icon: AnalyticsIcon,
      color: Platform.Analytics,
      text: <Trans t={t} i18nKey="ANALYTICS.DESCRIPTION" />,
      button: {
        text: t('ANALYTICS.BUTTON_TEXT'),
        href: '/features/#analytics',
      },
    },
  } as const;
  return (
    <Stack
      gap={8}
      maxWidth="md"
      direction="column"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h2">{t('TITLE')}</Typography>
      <Stack overflow="hidden" borderRadius={8} direction="column" gap="2px">
        <Row>
          <PlatformColorSurface {...PlatformProps.builder} />
          <PlatformColorSurface {...PlatformProps.analytics} />
        </Row>
        <Row>
          <PlatformColorSurface {...PlatformProps.player} />
        </Row>
      </Stack>
    </Stack>
  );
}
