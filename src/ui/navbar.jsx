import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav mb-3">
      <li className="nav-item">
        <Link className="nav-link " aria-current="page" to="/">
          Главная
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " aria-current="page" to="/users">
          Пользователи
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
