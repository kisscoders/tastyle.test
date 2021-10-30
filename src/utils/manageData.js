import _ from "lodash";
import { paginate } from "./paginate";

export const getDisplayData = (
  pageSize,
  currentPage,
  sortColumn,
  searchQuery,
  searchField,
  data
) => {
  let filtered = data;
  console.log(data, "Manage Data is processing this");

  searchQuery &&
    (filtered = data.filter((o) =>
      o.product.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    ));

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const outputData = paginate(sorted, currentPage, pageSize);

  const totalCount = filtered.length;
  const actualCount = data.length;

  return {
    actualCount,
    totalCount,
    outputData,
  };
};
