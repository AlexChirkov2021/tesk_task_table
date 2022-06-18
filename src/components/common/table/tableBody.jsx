import React from "react";
import _ from "loadsh";
import { useSelector } from "react-redux";

const TableBody = ({ data }) => {
  const columns = useSelector((state) => state.columns);
  const rednerContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{rednerContent(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
