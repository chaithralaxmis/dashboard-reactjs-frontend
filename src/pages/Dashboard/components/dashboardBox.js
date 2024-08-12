import { Button } from "@mui/material";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RxCountdownTimer } from "react-icons/rx";
const DashboardBox = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        className="dashboard-box d-flex flex-column justify-content-around position-relative"
        style={{
          backgroundImage: `linear-gradient(to right,${props.color?.[0]},${props.color?.[1]})`,
        }}
      >
        {props?.grow === true ? (
          <span className="chart">
            <IoMdTrendingUp />
          </span>
        ) : (
          <span className="chart">
            <IoMdTrendingDown />
          </span>
        )}
        <div className="d-flex w-100">
          <div className="col1">
            <h4 className="text-white mb-0">Total Users</h4>
            <span className="text-white">277</span>
          </div>
          <div className="ml-auto">
            {props.icon ? <span className="icon">{props.icon}</span> : ""}
          </div>
        </div>
        <div className="d-flex align-items-center text-white w-100 bottom-elem">
          <h6 className="mb-0 mt-0">Last Month</h6>
          <div className="ml-auto">
            <Button className="toggle-icon" onClick={handleClick}>
              <HiDotsVertical />
            </Button>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <RxCountdownTimer className="long-menu-timer" /> Last Day
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <RxCountdownTimer className="long-menu-timer" />
                Last Week
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <RxCountdownTimer className="long-menu-timer" />
                Last Month
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <RxCountdownTimer className="long-menu-timer" />
                Last Year
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Button>
    </>
  );
};
export default DashboardBox;
