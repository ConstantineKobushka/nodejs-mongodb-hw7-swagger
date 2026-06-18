const sortOrderlist = ['asc', 'desc'];

export const parseSortParams = ({ sortBy, sortOrder }, sortByList) => {
  const parsedSortOrder = sortOrderlist.includes(sortOrder)
    ? sortOrder
    : sortOrderlist[0];
  const parsedSortBy = sortByList.includes(sortBy) ? sortBy : '_id';

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
