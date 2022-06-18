import React from "react";
import { useSelector } from "react-redux";

const TableHeader = () => {
  const columns = useSelector((state) => state.columns);
  const sortBy = useSelector((state) => state.sortBy);
  const rendeSortArrow = (path, currentPath) => {
    if (path === currentPath) {
      if (sortBy.order === "asc") {
        return <i className="bi bi-caret-down-fill"></i>;
      } else {
        return <i className="bi bi-caret-up-fill"></i>;
      }
    }
    return null;
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            {...{ role: columns[column].path && "button" }}
            scope="col"
          >
            {columns[column].name}
            {rendeSortArrow(sortBy.path, columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
