import React from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize }) => {
  const currentPage = useSelector((state) => state.currentPage.page);
  const dispatch = useDispatch();
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={"page-item" + (page === currentPage ? " active" : "")}
            key={"page_" + page}
          >
            <button
              className="page-link"
              onClick={() => dispatch({ type: "SET_PAGE", payload: page })}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
