import React, { useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * @author
 * @function MenuItem
 **/

const MenuItem = (props) => {
  const { name, subMenus, iconClassName, onClick, to } = props;
  const [expand, setExpand] = useState(false);
  return (
    <li onClick={props.onClick}>
      <NavLink to={to} onClick={() => setExpand(!expand)} className="menu-item">
        <a>
          <div className="menu-icon">
            <i class={iconClassName}></i>
          </div>
          <span>{name}</span>
        </a>
      </NavLink>
      {subMenus && subMenus.length > 0 ? (
        <ul className={`sub-menu ${expand ? "active" : ""}`}>
          {subMenus.map((menu, index) => (
            <li key={index}>
              <NavLink to={menu.to}>{menu.name}</NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default MenuItem;
