import { useTranslation } from 'react-i18next';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Tooltip,
  Typography,
} from '@mui/material';

import { NS } from '@/config/constants';

import { SIGN_UP_SAVE_ACTIONS_ID } from '../../config/selectors';
import { AUTH } from '../../langs/constants';

const { SIGN_UP_SAVE_ACTIONS_TOOLTIP, SIGN_UP_SAVE_ACTIONS_LABEL } = AUTH;

type Props = {
  enableSaveActions: boolean;
  onUpdateSaveActions: (enabled: boolean) => void;
};

export function EnableAnalyticsForm({
  enableSaveActions,
  onUpdateSaveActions,
}: Props) {
  const { t } = useTranslation(NS.Auth);

  return (
    <Tooltip title={t(SIGN_UP_SAVE_ACTIONS_TOOLTIP)} placement="right">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id={SIGN_UP_SAVE_ACTIONS_ID}
              size="small"
              checked={enableSaveActions}
              onChange={(_, checked) => onUpdateSaveActions(checked)}
            />
          }
          label={
            <Typography fontSize="small">
              {t(SIGN_UP_SAVE_ACTIONS_LABEL)}
            </Typography>
          }
        />
      </FormGroup>
    </Tooltip>
  );
}
