import { useTranslation } from 'react-i18next';

import { Box, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { PackedItem, formatDate } from '@graasp/sdk';

import { CardActionAreaLink } from '@/components/ui/CardActionAreaLink';
import { NS } from '@/config/constants';

import ItemThumbnail from './ItemThumbnail';

type Props = {
  item: PackedItem;
};

const SimpleCard = ({ item }: Props): JSX.Element => {
  const { i18n } = useTranslation(NS.Player);

  return (
    <Card>
      <CardActionAreaLink
        to="/player/$rootId/$itemId"
        params={{ rootId: item.id, itemId: item.id }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              // do not allow icons to shrink
              flexShrink={0}
            >
              <ItemThumbnail item={item} />
            </Box>
            <Stack minWidth={0}>
              <Typography
                variant="h5"
                component="h2"
                alignItems="center"
                textOverflow="ellipsis"
                overflow="hidden"
                noWrap
              >
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(item.updatedAt, { locale: i18n.language })}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionAreaLink>
    </Card>
  );
};

export default SimpleCard;
