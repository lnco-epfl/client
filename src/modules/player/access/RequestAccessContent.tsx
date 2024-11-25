import { useTranslation } from 'react-i18next';

import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';

import {
  DiscriminatedItem,
  Member,
  MembershipRequestStatus,
} from '@graasp/sdk';

import { Check, Lock } from 'lucide-react';

import { NS } from '@/config/constants';
import { hooks, mutations } from '@/config/queryClient';
import { REQUEST_MEMBERSHIP_BUTTON_ID } from '@/config/selectors';

export const RequestAccessContent = ({
  member,
  itemId,
}: {
  member: Member;
  itemId: DiscriminatedItem['id'];
}): JSX.Element => {
  const { t: translatePlayer } = useTranslation(NS.Player);
  const {
    mutate: requestMembership,
    isSuccess,
    isPending,
  } = mutations.useRequestMembership();
  const { data: request } = hooks.useOwnMembershipRequest(itemId);

  if (request?.status === MembershipRequestStatus.Pending) {
    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        gap={2}
      >
        <Lock size={40} />
        <Typography variant="h3">
          {translatePlayer('REQUEST_ACCESS_PENDING_TITLE')}
        </Typography>
        <Typography>
          {translatePlayer('REQUEST_ACCESS_PENDING_DESCRIPTION')}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      gap={2}
    >
      <Lock size={40} />
      <Typography variant="h3">
        {translatePlayer('REQUEST_ACCESS_TITLE')}
      </Typography>
      <LoadingButton
        id={REQUEST_MEMBERSHIP_BUTTON_ID}
        disabled={isSuccess}
        loading={isPending}
        endIcon={isSuccess ? <Check /> : null}
        onClick={() => {
          requestMembership({ id: itemId });
        }}
        variant="contained"
      >
        {isSuccess
          ? translatePlayer('REQUEST_ACCESS_SENT_BUTTON')
          : translatePlayer('REQUEST_ACCESS_BUTTON')}
      </LoadingButton>
      <Typography variant="subtitle2">
        {translatePlayer('ITEM_LOGIN_HELPER_SIGN_OUT', {
          email: member.email,
        })}
      </Typography>
    </Stack>
  );
};
