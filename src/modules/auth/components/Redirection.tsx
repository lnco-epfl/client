import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Container, Stack, Typography, useTheme } from '@mui/material';

import { GraaspLogo } from '@graasp/ui';

import { ArrowRightIcon } from 'lucide-react';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';

import { DEFAULT_REDIRECTION_URL } from '../config/env';
import { hooks } from '../config/queryClient';
import { REDIRECTION_CONTENT_CONTAINER_ID } from '../config/selectors';
import { AUTH } from '../langs/constants';

type Props = {
  children: ReactNode;
};

export function Redirection({ children }: Props) {
  const theme = useTheme();
  const { data: member } = hooks.useCurrentMember();
  const { t } = useTranslation(NS.Auth);
  const targetLink = DEFAULT_REDIRECTION_URL;

  if (member) {
    return (
      <Container
        id={REDIRECTION_CONTENT_CONTAINER_ID}
        sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
      >
        <Stack
          direction="row"
          height="100%"
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <GraaspLogo height={100} sx={{ fill: theme.palette.primary.main }} />
          <Stack direction="column" alignItems="center" gap={2}>
            <Typography variant="h2">
              {t(AUTH.REDIRECTION_TITLE, { name: member.name })}
            </Typography>
            <Typography
              maxWidth="50ch"
              variant="caption"
              fontStyle="italic"
              align="center"
            >
              {t(AUTH.REDIRECTION_DESCRIPTION)}
            </Typography>
            <ButtonLink
              role="button"
              variant="contained"
              to={targetLink}
              endIcon={<ArrowRightIcon />}
            >
              {t(AUTH.REDIRECTION_BUTTON)}
            </ButtonLink>
          </Stack>
        </Stack>
      </Container>
    );
  }

  return children;
}
