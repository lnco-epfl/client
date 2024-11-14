import { Box, Typography } from '@mui/material';

import { useTheme } from '@graasp/ui';

export function Footer() {
  const { languageSelect } = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="end"
      alignItems="center"
      flexDirection="column"
      width="100%"
    >
      {languageSelect}
      <Typography variant="caption" color="darkgrey">
        © Graasp 2014 - {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
