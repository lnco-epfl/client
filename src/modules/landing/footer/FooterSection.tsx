import { ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

type FooterSectionProps = {
  name: string;
  children: ReactNode;
};
export function FooterSection({
  name,
  children,
}: FooterSectionProps): JSX.Element {
  return (
    <Stack flexGrow={1}>
      <Typography
        variant="h5"
        // do not use the title semantics for this element
        component="span"
        fontWeight="bold"
        mb={2}
        color="white"
      >
        {name}
      </Typography>
      <Stack direction="column">{children}</Stack>
    </Stack>
  );
}