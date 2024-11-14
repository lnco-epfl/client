import { InputAdornment } from '@mui/material';

import { LockIcon, MailIcon } from 'lucide-react';

export const EmailAdornment = (
  <InputAdornment position="start" color="inherit">
    <MailIcon color="currentColor" />
  </InputAdornment>
);
export const PasswordAdornment = (
  <InputAdornment position="start" color="inherit">
    <LockIcon color="currentColor" />
  </InputAdornment>
);
