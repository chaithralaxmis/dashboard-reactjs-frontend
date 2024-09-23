import { useState, useContext, useEffect } from "react";
import { Button } from "@mui/material";
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
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { deleteProduct, getProducts } from "../../utils/apiFunction";
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
  const [products, setProducts] = useState([]);
  const [productPagination, setProductPagination] = useState({});
  const [page, setPage] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }

    context.setisHideSidebarAndHeader(false);

    window.scrollTo(0, 0);

    getAllProducts();
  }, [page]);

  const getAllProducts = async () => {
    try {
      let payload = {
        page: page,
      };
      const res = await getProducts(payload);
      console.log(res);

      if (res.status == "200") {
        setProducts(res.data.data);
        let pagination = {
          limit: res.data.limit,
          total: res.data.total,
          page: res.data.page,
        };
        setProductPagination(pagination);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handlePaginationChange = async (event, newPage) => {
    console.log(newPage, "nepage");
    setPage(newPage);
  };

  const deleteSelProduct = async (data) => {
    try {
      await deleteProduct(data._id);
      getAllProducts();
    } catch (error) {
      throw new Error(error);
    }
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
                  {/* <th>Sales</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center product-box">
                        <div className="image-wrapper">
                          <div className="img">
                            {product.images.length == 0 ? (
                              <img
                                src="https://res.cloudinary.com/dzmyuwigf/image/upload/v1726738754/fqknznh1ciefxhkt7l59.jpg"
                                alt="product"
                                className="w-100"
                              />
                            ) : (
                              <img
                                src={product.images[0].url}
                                alt="product"
                                className="w-100"
                              />
                            )}
                          </div>
                        </div>
                        <div className="info">
                          <h6> {product?.title} </h6>
                          <p>{product?.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      {" "}
                      {product?.category?.title} / {product?.subCategory?.title}
                    </td>
                    <td>{product?.brand?.title}</td>
                    <td>
                      <div style={{ width: "70px" }}>
                        <del className="old">{product.price}</del>
                        <span className="new text-danger">$23.00</span>
                      </div>
                    </td>
                    <td>{product.quantity}</td>
                    <td>
                      {product.totalratings}({product.ratings.length})
                    </td>
                    <td> {product.sold}</td>
                    {/* <td>$38k</td> */}
                    <td>
                      <div className="actions d-flex align-items-center">
                        <Link to={`/product/details/${product._id}`}>
                          <Button className="secondary" color="secondary">
                            <FaEye />
                          </Button>
                        </Link>
                        <Link to={`/product/update/${product._id}`}>
                          <Button className="success" color="success">
                            <FaPencilAlt />
                          </Button>
                        </Link>
                        <Button
                          className="error"
                          color="error"
                          onClick={() => deleteSelProduct(product)}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex table-footer">
              <p>
                showing <b>{productPagination.limit}</b> of{" "}
                <b>{productPagination.total}</b> results.
              </p>
              <Pagination
                count={Math.ceil(
                  productPagination.total / productPagination.limit
                )}
                page={page}
                onChange={handlePaginationChange}
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
