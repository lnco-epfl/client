export const SHOW_MORE_ITEMS_ID = 'showMoreItems';
export const HOME_NAVIGATION_STACK_ID = 'homeNavigation';
export const MY_ITEMS_ID = 'myItems';

export const HIDDEN_WRAPPER_ID_CY = 'hiddenWrapper';
export const buildHiddenWrapperId = (id: string, isHidden: boolean): string =>
  `${HIDDEN_WRAPPER_ID_CY}-${id}-${isHidden ? 'grayed' : 'visible'}`;

export const BUILDER_EDIT_BUTTON_ID = 'builderEditButton';

export const buildTreeShortcutItemClass = (id: string): string =>
  `buildTreeShortcutItem-${id}`;

export const buildDataCyWrapper = (dataCy: string): string =>
  `[data-cy="${dataCy}"]`;

export const HEADER_MEMBER_MENU_BUTTON_ID = 'headerMemberMenuButton';
export const HEADER_MEMBER_MENU_SEE_PROFILE_BUTTON_ID =
  'headerMemberMenuSeeProfileButton';
export const HEADER_MEMBER_MENU_SIGN_IN_BUTTON_ID =
  'headerMemberMenuSignInButton';

export const HEADER_MEMBER_MENU_SIGN_OUT_BUTTON_ID =
  'headerMemberMenuSignOutButton';
export const buildMemberMenuItemId = (id: string): string =>
  `memberMenuItem-${id}`;
export const OWN_ITEMS_GRID_ID = 'ownItemsGrid';
export const buildMemberAvatarId = (id?: string): string =>
  `memberAvatar-${id}`;
