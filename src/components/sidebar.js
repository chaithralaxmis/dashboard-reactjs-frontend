import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { FaBell, FaProductHunt, FaShoppingCart } from "react-icons/fa";
import { IoIosArrowForward, IoIosSettings } from "react-icons/io";
import { MdDashboard, MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
// import { MyContext } from "../App";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

  // const context = useContext(MyContext);

  const onOpenSubMenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  };
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 0 ? "active" : ""}`}
                onClick={() => onOpenSubMenu(0)}
              >
                <span className="icon">
                  <MdDashboard />
                </span>
                Dashboard
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className={`w-100 ${activeTab === 1 && isToggleSubmenu ? "active" : ""}`}
              onClick={() => onOpenSubMenu(1)}
            >
              <span className="icon">
                <FaProductHunt />
              </span>
              Products
              <span className="arrow">
                <IoIosArrowForward />
              </span>
            </Button>
            <div
              className={`submenu-wrapper ${activeTab === 1 && isToggleSubmenu ? "collapse" : "collapsed"}`}
            >
              <ul className="submenu">
                <li>
                  <Link to={"/product/list"}>Product List</Link>
                </li>

                <li>
                  <Link to={"/product/upload"}>Product Upload</Link>
                </li>
                <li>
                  <Link to={"/product/category"}>Product Category</Link>
                </li>
                <li>
                  <Link to={"/product/brand"}>Product Brand</Link>
                </li>
                <li>
                  <Link to={"/product/color"}>Product Color</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 2 && isToggleSubmenu ? "active" : ""}`}
                onClick={() => onOpenSubMenu(2)}
              >
                <span className="icon">
                  <FaShoppingCart />
                </span>
                Orders
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 3 && isToggleSubmenu ? "active" : ""}`}
                onClick={() => onOpenSubMenu(3)}
              >
                <span className="icon">
                  <MdMessage />
                </span>
                Messages
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 4 && isToggleSubmenu ? "active" : ""}`}
                onClick={() => onOpenSubMenu(4)}
              >
                <span className="icon">
                  <FaBell />
                </span>
                Notifications
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 5 && isToggleSubmenu ? "active" : ""}`}
                onClick={() => onOpenSubMenu(5)}
              >
                <span className="icon">
                  <IoIosSettings />
                </span>
                Settings
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>
        </ul>

        <br />

        <div className="logout-wrapper ">
          <div className="logout-box d-flex align-items-center justify-content-center">
            <Button variant="contained">
              <Logout />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
