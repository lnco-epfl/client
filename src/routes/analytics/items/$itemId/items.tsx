import { useTranslation } from 'react-i18next';

import { createFileRoute } from '@tanstack/react-router';

import { NS } from '@/config/constants';

import SectionTitle from '~analytics/common/SectionTitle';
import ChartsAlerts from '~analytics/space/charts-layout/ChartsAlerts';
import ChartsHeader from '~analytics/space/charts-layout/ChartsHeader';
import ItemsAnalytics from '~analytics/space/charts-layout/ItemsAnalytics';

export const Route = createFileRoute('/analytics/items/$itemId/items')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(NS.Analytics);

  return (
    <>
      <ChartsHeader />
      <ChartsAlerts />
      <SectionTitle title={t('ITEMS_ANALYTICS_TITLE')} />
      <ItemsAnalytics />
    </>
  );
}
