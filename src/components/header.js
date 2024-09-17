import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import logo from "../assets/images/logo.svg";
import Button from "@mui/material/Button";
import {
  MdDarkMode,
  MdMenuOpen,
  MdOutlineLightMode,
  MdOutlineMail,
  MdOutlineMenu,
} from "react-icons/md";
import SearchBox from "./searchBox";
import { IoCartOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import { MyContext } from "../App";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotification, setisOpenNotification] = useState(false);

  const openMyAcc = Boolean(anchorEl);
  const openNotication = Boolean(isOpenNotification);

  const context = useContext(MyContext);
  const { user } = useSelector((state) => state.user);

  const handleOpenMyAcc = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorEl(null);
  };

  const handleOpenNotification = () => [setisOpenNotification(true)];

  const handleCloseNotification = () => {
    setisOpenNotification(false);
  };
  useEffect(() => {
    console.log(user);
  });
  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row w-100">
            <div className="col-sm-3 col-md-2 col-lg-2  d-flex align-items-center part-1">
              <Link to={"/"} className="d-flex align-items-center logo">
                {/* <img src={logo} /> */}
                <span className="ml-2">E-Com</span>
              </Link>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 d-flex align-items-center part-2">
              <Button
                className="rounded-circle mr-3"
                onClick={() => {
                  context.setIsToggleSidebar(!context.isToggleSidebar);
                }}
              >
                {context.isToggleSidebar === true ? (
                  <MdOutlineMenu />
                ) : (
                  <MdMenuOpen />
                )}
              </Button>
              <SearchBox />
            </div>
            <div className="col-sm-6 col-md-7 col-lg-7 d-flex align-items-center part-3 justify-content-end">
              <Button
                className="rounded-circle mr-3"
                onClick={() => context.setLightThemeMode(!context.lightTheme)}
              >
                {context.lightTheme === true ? (
                  <MdOutlineLightMode />
                ) : (
                  <MdDarkMode />
                )}
              </Button>
              <Button className="rounded-circle mr-3">
                <IoCartOutline />
              </Button>

              <Button className="rounded-circle mr-3">
                <MdOutlineMail />
              </Button>
              <div className="dropdown-wrapper position-relative">
                <Button
                  className="rounded-circle mr-3"
                  onClick={handleOpenNotification}
                >
                  <FaRegBell />
                </Button>
                <Menu
                  anchorEl={isOpenNotification}
                  id="notification-menu"
                  className="notifications dropdown-list"
                  open={openNotication}
                  onClose={handleCloseNotification}
                  onClick={handleCloseNotification}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <div className="head pl-3 pb-0">
                    <h4>Orders (12) </h4>
                  </div>
                  <Divider className="mb-1" />
                  <div className="scroll-cont">
                    <MenuItem onClick={handleCloseNotification}>
                      <div className="d-flex ">
                        <div>
                          <div className="user-img">
                            <span className="rounded-circle">
                              <Avatar />
                            </span>
                          </div>
                        </div>
                        <div className="dropdown-info">
                          <h4>
                            <span>
                              <b>Goutham</b>
                              added to his favourite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago!</p>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotification}>
                      <div className="d-flex ">
                        <div>
                          <div className="user-img">
                            <span className="rounded-circle">
                              <Avatar />
                            </span>
                          </div>
                        </div>
                        <div className="dropdown-info">
                          <h4>
                            <span>
                              <b>Goutham</b>
                              added to his favourite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago!</p>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotification}>
                      <div className="d-flex ">
                        <div>
                          <div className="user-img">
                            <span className="rounded-circle">
                              <Avatar />
                            </span>
                          </div>
                        </div>
                        <div className="dropdown-info">
                          <h4>
                            <span>
                              <b>Goutham</b>
                              added to his favourite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago!</p>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotification}>
                      <div className="d-flex ">
                        <div>
                          <div className="user-img">
                            <span className="rounded-circle">
                              <Avatar />
                            </span>
                          </div>
                        </div>
                        <div className="dropdown-info">
                          <h4>
                            <span>
                              <b>Goutham</b>
                              added to his favourite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago!</p>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotification}>
                      <div className="d-flex ">
                        <div>
                          <div className="user-img">
                            <span className="rounded-circle">
                              <Avatar />
                            </span>
                          </div>
                        </div>
                        <div className="dropdown-info">
                          <h4>
                            <span>
                              <b>Goutham</b>
                              added to his favourite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago!</p>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotification}>
                      <div className="d-flex ">
                        <div>
                          <div className="user-img">
                            <span className="rounded-circle">
                              <Avatar />
                            </span>
                          </div>
                        </div>
                        <div className="dropdown-info">
                          <h4>
                            <span>
                              <b>Goutham</b>
                              added to his favourite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago!</p>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotification}>
                      <div className="d-flex ">
                        <div>
                          <div className="user-img">
                            <span className="rounded-circle">
                              <Avatar />
                            </span>
                          </div>
                        </div>
                        <div className="dropdown-info">
                          <h4>
                            <span>
                              <b>Goutham</b>
                              added to his favourite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago!</p>
                        </div>
                      </div>
                    </MenuItem>
                  </div>
                  <div className="pl-2 pr-2 pt-2 w-100">
                    <Button className="btn-blue w-100">
                      View all notifications
                    </Button>
                  </div>
                </Menu>
              </div>
              {context.isLogin === false ? (
                <Link to={"/login"}>
                  <Button className="btn-blue btn-lg btn-round">Sign In</Button>
                </Link>
              ) : (
                <div className="my-acc-wrapper">
                  <Button
                    className="my-acc d-flex align-items-center"
                    onClick={handleOpenMyAcc}
                  >
                    <div className="user-img">
                      <span className="rounded-circle">
                        <Avatar />
                      </span>
                    </div>
                    <div className="user-info">
                      <h4>{user?.name}</h4>
                      <p className="mb-0">{user?.email}</p>
                    </div>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openMyAcc}
                    onClose={handleCloseMyAcc}
                    onClick={handleCloseMyAcc}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleCloseMyAcc}>
                      <ListItemIcon>
                        <CgProfile />
                      </ListItemIcon>
                      My Account
                    </MenuItem>
                    <MenuItem onClick={handleCloseMyAcc}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Reset Password
                    </MenuItem>
                    <MenuItem onClick={handleCloseMyAcc}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
