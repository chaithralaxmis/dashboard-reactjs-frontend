import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { FaEye, FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import DashboardBox from "./components/dashboardBox";
import { IoMdCart } from "react-icons/io";
import { MdDelete, MdShoppingBag } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RxCountdownTimer } from "react-icons/rx";
import { Chart } from "react-google-charts";

import Pagination from "@mui/material/Pagination";
// import InputLabel from "@mui/material/InputLabel";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "My Daily Activities",
  backgroundColor: "transparent",
  chartArea: { width: "100%", height: "100%" },
};
const Dashboard = () => {
  const [showBy, setShowBy] = useState("");
  const [categoryBy, setCategoryBy] = useState("");
  const [brandBy, setBrandBy] = useState("");

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
      <div className="right-content">
        <div className="row dashboard-box-wrapper-row">
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="dashboard-box-wrapper d-flex">
              <DashboardBox
                color={["#1da256", "#48d483"]}
                grow={true}
                icon={<FaUserCircle />}
              />
              <DashboardBox
                color={["#c012e2", "#eb64fe"]}
                icon={<IoMdCart />}
              />
              <DashboardBox
                color={["#2c78e5", "#60aff5"]}
                icon={<MdShoppingBag />}
              />
              <DashboardBox
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="graph-box">
              <div className="d-flex align-items-center text-white w-100 bottom-elem">
                <h6 className="mb-0 mt-0">Toatl Sales</h6>
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
              <h3 className="text-white font-weight-bold">$3,787,681.00</h3>
              <p>$3,578.90 in last month</p>
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"170px"}
              />
            </div>
          </div>
        </div>
        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="heading">Best Selling Products</h3>
          <div className="row card-filters mt-3">
            <div className="col-md-3">
              <h4>SHOW BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBy}
                  onChange={(e) => {
                    setShowBy(e.target.value);
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>CATEGORY BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={categoryBy}
                  onChange={(e) => {
                    setCategoryBy(e.target.value);
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>BRAND BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={brandBy}
                  onChange={(e) => {
                    setBrandBy(e.target.value);
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>SEARCH BY</h4>
              <TextField
                id="outlined-size-small"
                label="id/name/category/brand"
                className="w-100"
                size="small"
              />
            </div>
          </div>
          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th style={{ width: "300px" }}>Product</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th>Order</th>
                  <th>Sales</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center product-box">
                      <div className="image-wrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            alt="product"
                            className="w-100"
                          ></img>
                        </div>
                      </div>
                      <div className="info">
                        <h6>Tops and skirt set for female</h6>
                        <p>
                          Womens exclusive summer tops and skirt set for female
                          top and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$21.00</del>
                      <span className="new text-danger">$23.00</span>
                    </div>
                  </td>
                  <td>30</td>
                  <td>49(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="success" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center product-box">
                      <div className="image-wrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="product"
                          ></img>
                        </div>
                      </div>
                      <div className="info">
                        <h6>Tops and skirt set for female</h6>
                        <p>
                          Womens exclusive summer tops and skirt set for female
                          top and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$21.00</del>
                      <span className="new text-danger">$23.00</span>
                    </div>
                  </td>
                  <td>30</td>
                  <td>49(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="success" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center product-box">
                      <div className="image-wrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="product"
                          ></img>
                        </div>
                      </div>
                      <div className="info">
                        <h6>Tops and skirt set for female</h6>
                        <p>
                          Womens exclusive summer tops and skirt set for female
                          top and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$21.00</del>
                      <span className="new text-danger">$23.00</span>
                    </div>
                  </td>
                  <td>30</td>
                  <td>49(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="success" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center product-box">
                      <div className="image-wrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="product"
                          ></img>
                        </div>
                      </div>
                      <div className="info">
                        <h6>Tops and skirt set for female</h6>
                        <p>
                          Womens exclusive summer tops and skirt set for female
                          top and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$21.00</del>
                      <span className="new text-danger">$23.00</span>
                    </div>
                  </td>
                  <td>30</td>
                  <td>49(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="success" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center product-box">
                      <div className="image-wrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="product"
                          ></img>
                        </div>
                      </div>
                      <div className="info">
                        <h6>Tops and skirt set for female</h6>
                        <p>
                          Womens exclusive summer tops and skirt set for female
                          top and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$21.00</del>
                      <span className="new text-danger">$23.00</span>
                    </div>
                  </td>
                  <td>30</td>
                  <td>49(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="success" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center product-box">
                      <div className="image-wrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="product"
                          ></img>
                        </div>
                      </div>
                      <div className="info">
                        <h6>Tops and skirt set for female</h6>
                        <p>
                          Womens exclusive summer tops and skirt set for female
                          top and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$21.00</del>
                      <span className="new text-danger">$23.00</span>
                    </div>
                  </td>
                  <td>30</td>
                  <td>49(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="success" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center product-box">
                      <div className="image-wrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="product"
                          ></img>
                        </div>
                      </div>
                      <div className="info">
                        <h6>Tops and skirt set for female</h6>
                        <p>
                          Womens exclusive summer tops and skirt set for female
                          top and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$21.00</del>
                      <span className="new text-danger">$23.00</span>
                    </div>
                  </td>
                  <td>30</td>
                  <td>49(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="success" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex table-footer">
              <p>
                showing <b>12</b> of <b>60</b> results.{" "}
              </p>
              <Pagination
                count={10}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
