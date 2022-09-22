import React, { useEffect, useState } from "react";
import logo from "../assets/logo/logo2.png";
import Login from "../page/login";
import MenuItem from "./menuItem";
import Button from "react-bootstrap/Button";
/**
 * @author
 * @function SideMenu
 **/

const menuItem = [
  {
    name: "Dashboard",
    to: "/Dashboard",
    iconClassName: "bi bi-ui-checks-grid",
  },
  {
    name: "Order",
    to: `/Order`,
    iconClassName: "bi bi-inboxes-fill",
  },
  {
    name: "Customer",
    to: `/Customer`,
    iconClassName: "bi bi-people-fill",
  },
  {
    name: "Work Order",
    to: `/WorkOrder`,
    iconClassName: "bi bi-calendar3",
  },
  {
    name: "Costing",
    to: `/Calculation/Costing`,
    iconClassName: "bi bi-calculator",
  },
  {
    name: "Company",
    to: `/Company`,
    iconClassName: "bi bi-building",
  },
  {
    name: "Accident",
    to: `/Accident`,
    iconClassName: "bi bi-activity",
  },
  // {
  //     name: 'User Rights',
  //     to: `/UserRights`,
  //     iconClassName: 'bi bi-person-check-fill'
  // },

  {
    name: "Truck Information",
    to: `/CarInformation/TruckInformation`,
    iconClassName: "bi bi-truck-flatbed",
  },
  {
    name: "Container Data",
    to: `/CarInformation/ContainerData`,
    iconClassName: "bi bi-archive",
  },

  // {
  //     name: 'Logout',
  //     to: `/`,
  //     iconClassName: 'bi bi-gear-fill'
  // },
];
const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);
  useEffect(() => {
    if (inactive) {
      document.querySelectorAll(".sub-menu").forEach((el) => {
        el.classList.remove("active");
      });
    }
    props.onCollapse(inactive);
  }, [inactive]);
  return (
    <div className={`side-menu`}>
      <aside>
        <div className="top-section">
          <div className="logo">
            <img src={logo} alt="website" />
            <h2 className="text-muted">
              Truck<span className="danger">Rent</span>
            </h2>
          </div>
        </div>

        <div className="divider"></div>
        <div className="main-menu">
          {menuItem.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={() => {
                setInactive(false);
              }}
            />
          ))}
          <div className="side-menu-footer">
            <Button className="Logout" href={<Login />}>
              <a className="text2">Logout</a>
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideMenu;
