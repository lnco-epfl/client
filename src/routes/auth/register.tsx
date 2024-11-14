import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

import { LeftContentContainer } from '~auth/components/LeftContentContainer';
import { Register } from '~auth/components/register/Register';

const registerSearchSchema = z.object({
  url: z.string().url().optional(),
  m: z.string().optional(),
  invitationId: z.string().uuid().optional(),
});

export const Route = createFileRoute('/auth/register')({
  validateSearch: zodSearchValidator(registerSearchSchema),

  component: RegisterPage,
});

function RegisterPage() {
  const search = Route.useSearch();
  return (
    <LeftContentContainer>
      <Register search={search} />
    </LeftContentContainer>
  );
}
