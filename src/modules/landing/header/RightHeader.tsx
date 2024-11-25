import { useTranslation } from 'react-i18next';

import { Stack } from '@mui/material';

import { useAuth } from '@/AuthContext';
import { ButtonLink } from '@/components/ui/ButtonLink';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';

import { UserAvatar } from './UserAvatar';

export function RightHeader(): JSX.Element {
  const { isAuthenticated, user, logout } = useAuth();
  const { t, i18n } = useTranslation(NS.Common);
  const { mutate } = mutations.useEditCurrentMember();

  const handleLanguageChange = (lang: string) => {
    mutate({ extra: { lang } });
    i18n.changeLanguage(lang);
  };

  if (isAuthenticated) {
    return (
      <Stack gap={2} direction="row" alignItems="center">
        <LanguageSwitch lang={i18n.language} onChange={handleLanguageChange} />
        <UserAvatar user={user} logout={logout} />
      </Stack>
    );
  }

  return (
    <Stack gap={2} direction="row" id="leftTitleWrapper" alignItems="center">
      <LanguageSwitch lang={i18n.language} onChange={handleLanguageChange} />
      <ButtonLink to="/auth/login">{t('LOG_IN.BUTTON_TEXT')}</ButtonLink>
      <ButtonLink to="/auth/register">{t('REGISTER.BUTTON_TEXT')}</ButtonLink>
    </Stack>
  );
}
