import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid2 } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';

import SectionTitle from '~analytics/common/SectionTitle';
import { DataContext } from '~analytics/context/DataProvider';
import AppContent from '~analytics/space/charts-layout/AppsContent';

export const Route = createFileRoute('/analytics/items/$itemId/apps')({
  component: AppsAnalyticPage,
});

function AppsAnalyticPage(): JSX.Element | null {
  const { t } = useTranslation(NS.Analytics);
  const { user, isAuthenticated } = useAuth();
  const { descendantApps } = useContext(DataContext);

  if (!isAuthenticated) {
    return null;
  }

  if (descendantApps.length) {
    return (
      <>
        <SectionTitle title={t('APPS_ANALYTICS_TITLE')} />
        <Grid2 container spacing={2} p={2}>
          {descendantApps.map((item) => (
            <Grid2 key={item.id} size={{ xs: 12 }}>
              <AppContent item={item} member={user} />
            </Grid2>
          ))}
        </Grid2>
      </>
    );
  }
  return null;
}
