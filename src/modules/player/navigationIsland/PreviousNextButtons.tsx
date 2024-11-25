import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import { useParams, useSearch } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useAuth } from '@/AuthContext';
import { hooks } from '@/config/queryClient';

import {
  combineUuids,
  shuffleAllButLastItemInArray,
} from '~player/utils/shuffle';

import { LoadingButton, NavigationButton } from './customButtons';

const usePreviousNextButtons = (): {
  previousButton: JSX.Element | null;
  nextButton: JSX.Element | null;
} => {
  const { rootId, itemId } = useParams({ from: '/player/$rootId/$itemId/' });
  const search = useSearch({ from: '/player/$rootId/$itemId/' });
  const { user } = useAuth();
  const { data: rootItem } = hooks.useItem(rootId);

  const { shuffle } = search;

  const { data: descendants, isLoading } = hooks.useDescendants({
    id: rootId,
    types: [ItemType.FOLDER],
    showHidden: false,
    enabled: Boolean(rootId),
  });

  if (isLoading) {
    return {
      previousButton: (
        <LoadingButton disabled>
          <ChevronLeft />
        </LoadingButton>
      ),
      nextButton: (
        <LoadingButton disabled>
          <ChevronRight />
        </LoadingButton>
      ),
    };
  }

  const prevRoot: DiscriminatedItem | null = rootItem || null;
  let prev: DiscriminatedItem | null = null;
  let next: DiscriminatedItem | null = null;

  // if there are no descendants then there is no need to navigate
  if (!Array.isArray(descendants)) {
    return { previousButton: null, nextButton: null };
  }

  let folderHierarchy = descendants;

  if (shuffle) {
    // seed for shuffling is consistent for member + root (base) item combination
    const baseId = rootId || '';
    const memberId = user?.id || '';
    const combinedUuids = combineUuids(baseId, memberId);
    folderHierarchy = shuffleAllButLastItemInArray(
      folderHierarchy,
      combinedUuids,
    );
  }

  // when focusing on the root item
  if (itemId === rootId && folderHierarchy.length) {
    // there is no previous and the nex in the first item in the hierarchy
    [next] = folderHierarchy;
    // when focusing on the descendants
  } else {
    const idx = folderHierarchy.findIndex(({ id }) => id === itemId);

    // if index is not found, then do not show navigation
    if (idx < 0) {
      return { previousButton: null, nextButton: null };
    }

    // if index is 0, previous is root
    prev = idx === 0 ? prevRoot : folderHierarchy[idx - 1];
    // check if the next element is inside the bounds of folderHierarchy, of not, next will simply stay null
    if (idx + 1 < folderHierarchy.length) {
      next = folderHierarchy[idx + 1];
    }
  }

  // should we display both buttons if they are disabled ?
  if (!prev && !next) {
    return { previousButton: null, nextButton: null };
  }

  return {
    previousButton: (
      <NavigationButton
        disabled={!prev}
        key="previousButton"
        to="/player/$rootId/$itemId"
        params={{ rootId, itemId: prev?.id ?? '' }}
        search={search}
      >
        <ChevronLeft />
      </NavigationButton>
    ),

    nextButton: (
      <NavigationButton
        disabled={!next}
        key="nextButton"
        to="/player/$rootId/$itemId"
        params={{ rootId, itemId: next?.id ?? '' }}
        search={search}
      >
        <ChevronRight />
      </NavigationButton>
    ),
  };
};
export default usePreviousNextButtons;
