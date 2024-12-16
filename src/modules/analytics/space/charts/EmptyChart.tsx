import { useTranslation } from 'react-i18next';

import { Alert, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { NS } from '@/config/constants';

import ChartTitle from '../../common/ChartTitle';
import SelectContainer from '../../common/SelectContainer';
import { CONTAINER_HEIGHT } from '../../config/constants';

const EmptyChartAlert = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: `${CONTAINER_HEIGHT}px`,
});

type Props = {
  chartTitle: string;
  selectFilter?: JSX.Element;
  isError?: boolean;
};

export function EmptyChart({
  chartTitle,
  selectFilter,
  isError = false,
}: Props): JSX.Element {
  const { t } = useTranslation(NS.Analytics);

  const message = t('NO_ACTIONS_TO_SHOW_FOR_THIS_USER');

  return (
    <Stack direction="column">
      <ChartTitle title={chartTitle} />
      {selectFilter && <SelectContainer>{selectFilter}</SelectContainer>}
      <EmptyChartAlert>
        {isError ? (
          <Alert severity="error">{t('CHART_DATA_UNAVAILABLE')}</Alert>
        ) : (
          <Typography>{message}</Typography>
        )}
      </EmptyChartAlert>
    </Stack>
  );
}

export default EmptyChart;
