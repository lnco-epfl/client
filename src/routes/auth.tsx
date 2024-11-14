import { Outlet, createFileRoute } from '@tanstack/react-router';

import { RECAPTCHA_SITE_KEY } from '@/config/env';

import { RecaptchaProvider } from '~auth/context/RecaptchaContext';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RecaptchaProvider siteKey={RECAPTCHA_SITE_KEY}>
      <Outlet />
    </RecaptchaProvider>
  );
}
