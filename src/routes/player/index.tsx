import { Trans, useTranslation } from 'react-i18next';

import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { AccountType } from '@graasp/sdk';

import { createFileRoute, redirect } from '@tanstack/react-router';
import { ClipboardPenIcon } from 'lucide-react';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { LOG_IN_PAGE_PATH } from '@/config/paths';
import { PREVENT_GUEST_MESSAGE_ID } from '@/config/selectors';

export const Route = createFileRoute('/player/')({
  beforeLoad: ({ context }) => {
    // check if the user is authenticated.
    // if not, redirect to `/auth/login` so the user can log in their account
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: LOG_IN_PAGE_PATH,
        search: {
          url: window.location.href,
        },
      });
    }
  },
  component: HomePage,
});

function HomePage(): JSX.Element {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation(NS.Player);
  if (isAuthenticated && user.type === AccountType.Guest) {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        <Container maxWidth="md">
          <Alert severity="info" id={PREVENT_GUEST_MESSAGE_ID}>
            <Typography>
              {
                <Trans
                  t={t}
                  i18nKey={'GUEST_LIMITATION_TEXT'}
                  values={{
                    name: user.name,
                  }}
                  components={{ 1: <strong /> }}
                />
              }
            </Typography>
            <Box mt={2} textAlign="center">
              <Button
                startIcon={<ClipboardPenIcon />}
                variant="contained"
                sx={{ textTransform: 'none' }}
                onClick={logout}
              >
                {t('GUEST_SIGN_OUT_BUTTON')}
              </Button>
            </Box>
          </Alert>
        </Container>
      </Stack>
    );
  }
  return <Button>helllo</Button>;
}
