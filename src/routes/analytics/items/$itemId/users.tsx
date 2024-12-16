import { useTranslation } from 'react-i18next';

import { Grid2 } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { NS } from '@/config/constants';

import SectionTitle from '~analytics/common/SectionTitle';
import ChartsAlerts from '~analytics/space/charts-layout/ChartsAlerts';
import ChartsHeader from '~analytics/space/charts-layout/ChartsHeader';
import ActionsByUserChart from '~analytics/space/charts/ActionsByUserChart';
import UsersByActionByChart from '~analytics/space/charts/UsersByActionChart';

export const Route = createFileRoute('/analytics/items/$itemId/users')({
  component: UsersAnalyticPage,
});

function UsersAnalyticPage(): JSX.Element {
  const { t } = useTranslation(NS.Analytics);
  return (
    <>
      <ChartsHeader />
      <ChartsAlerts />
      <SectionTitle title={t('USERS_ANALYTICS_TITLE')} />
      <UsersAnalytics />
    </>
  );
}

function UsersAnalytics(): JSX.Element {
  return (
    <Grid2 container width="100%">
      <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
        <ActionsByUserChart />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
        <UsersByActionByChart />
      </Grid2>
    </Grid2>
  );
}
