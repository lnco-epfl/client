import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Grid2 as Grid,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from '@mui/material';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import {
  HOME_PAGE_PAGINATION_ID,
  buildHomePaginationId,
} from '@/config/selectors';

import { DisplayItems } from './DisplayItems';

// should be a multiple of 6 to create full pages that split into 2, 3 and 6 columns
const PAGE_SIZE = 24;

export function RecentItems() {
  const { t } = useTranslation(NS.Player);

  const [page, setPage] = useState(1);

  const { data: accessibleItems, isLoading } = hooks.useAccessibleItems(
    {},
    { page, pageSize: PAGE_SIZE },
  );

  return (
    <Stack m={2} direction="column" alignItems="center" spacing={4}>
      <Stack direction="column" width="100%">
        <Typography variant="h4" component="h1" mb={1}>
          {t('RECENT_ITEMS_TITLE')}
        </Typography>
        <Grid container spacing={3} justifyItems="center">
          <DisplayItems items={accessibleItems?.data} isLoading={isLoading} />
        </Grid>
      </Stack>
      <Pagination
        id={HOME_PAGE_PAGINATION_ID}
        count={Math.ceil((accessibleItems?.totalCount ?? 0) / PAGE_SIZE)}
        page={page}
        // use the render prop to add a unique id that we can use for tests
        renderItem={(props) => (
          <PaginationItem {...props} id={buildHomePaginationId(props.page)} />
        )}
        onChange={(_, newPage) => setPage(newPage)}
      />
    </Stack>
  );
}
