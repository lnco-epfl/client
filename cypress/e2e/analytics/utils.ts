export const buildItemPath = ({
  itemId = `:itemId`,
  searchParams = '',
} = {}): string => {
  let url = `/analytics/${itemId}`;
  // append search parameters if present
  if (searchParams) {
    url = `${url}?${searchParams}`;
  }
  return url;
};
