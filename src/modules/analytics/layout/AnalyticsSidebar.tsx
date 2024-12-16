import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppsIcon from '@mui/icons-material/Apps';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { Stack } from '@mui/material';

import { PermissionLevel, PermissionLevelCompare } from '@graasp/sdk';

import { MainMenuItem } from '@/components/ui/MainMenuItem';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';

import {
  APP_ITEM,
  TAB_GENERAL,
  TAB_ITEMS,
  TAB_USERS,
  buildSidebarListItemId,
} from '~analytics/config/selectors';
import { DataContext } from '~analytics/context/DataProvider';

export function AnalyticsSidebar({ itemId }: { itemId: string }): JSX.Element {
  const { t } = useTranslation(NS.Analytics);
  const { descendantApps } = useContext(DataContext);
  const { data: item } = hooks.useItem(itemId);

  const menuItems = [];

  if (item) {
    menuItems.push(
      <MainMenuItem
        key="general"
        id={buildSidebarListItemId(TAB_GENERAL)}
        text={t('TAB_GENERAL')}
        icon={<BarChartIcon />}
        to="/analytics/items/$itemId"
        params={{ itemId }}
      />,
      <MainMenuItem
        key="users"
        id={buildSidebarListItemId(TAB_USERS)}
        text={t('TAB_USERS')}
        icon={<PersonIcon />}
        to="/analytics/items/$itemId/users"
        params={{ itemId }}
      />,
      <MainMenuItem
        key="items"
        id={buildSidebarListItemId(TAB_ITEMS)}
        text={t('TAB_ITEMS')}
        icon={<FolderIcon />}
        to="/analytics/items/$itemId/items"
        params={{ itemId }}
      />,
    );
    if (descendantApps.length) {
      menuItems.push(
        <MainMenuItem
          key="apps"
          id={buildSidebarListItemId(APP_ITEM)}
          text={t('TAB_APPS')}
          icon={<AppsIcon />}
          to="/analytics/items/$itemId/apps"
          params={{ itemId }}
        />,
      );
    }

    // read access users don't have permission over export actions
    if (
      item?.permission &&
      PermissionLevelCompare.gte(item.permission, PermissionLevel.Write)
    ) {
      menuItems.push(
        <MainMenuItem
          key="export"
          text={t('TAB_EXPORT')}
          to="/analytics/items/$itemId/export"
          params={{ itemId }}
          icon={<CloudDownloadIcon />}
        />,
      );
    }
  } else {
    menuItems.push(
      <MainMenuItem
        key="home"
        icon={<HomeIcon />}
        text={t('HOME_MENU_ITEM')}
        to="/analytics"
      />,
    );
  }

  return <Stack>{menuItems}</Stack>;
}
