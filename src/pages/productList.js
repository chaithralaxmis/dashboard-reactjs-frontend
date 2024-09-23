import { FormControl, MenuItem, Pagination, Select } from "@mui/material";
import { Button } from "@mui/material";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { getProducts } from "../utils/apiFunction";
import { jwtDecode } from "jwt-decode";

const ProductList = () => {
  const [showBy, setShowBy] = useState("");
  const [categoryBy, setCategoryBy] = useState("");
  const [brandBy, setBrandBy] = useState("");
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
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="heading">Products</h3>
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
              <input
                type="text"
                placeholder="id/name/category/brand"
                className="w-100 input-searchby"
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
                        <Link to={"/product/details"}>
                          <Button className="secondary" color="secondary">
                            <FaEye />
                          </Button>
                        </Link>

                        <Button className="success" color="success">
                          <FaPencilAlt />
                        </Button>
                        <Button className="error" color="error">
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
export default ProductList;
