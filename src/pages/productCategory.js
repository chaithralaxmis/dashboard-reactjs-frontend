import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  addProductCategory,
  deleteProductCategory,
  getProductCategory,
  getProductSubCategory,
  updateProductCategory,
} from "../utils/apiFunction";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ProductCategory = () => {
  const [title, setTitle] = useState("");
  const [parentCategory, setParentCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [finalCategory, setFinalCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [expanded, setExpanded] = useState(false);
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
    getProductCategories();
  }, []);

  const getProductCategories = async () => {
    try {
      const res = await getProductCategory();
      const res2 = await getProductCategory("parent");
      setCategories(res.data.data);
      setParentCategories(res2.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const getProductSubCategories = async (value) => {
    try {
      const res = await getProductSubCategory(value);
      setSubCategories(res.data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setEdit(false);
    setSubCategory(null);
    setSubCategories([]);
    setCategories([]);
    setParentCategory(null);
    setFinalCategory(null);

    getProductCategories();
  };

  const addCategory = async () => {
    try {
      await addProductCategory({ title, parentCategory: finalCategory });
      resetForm();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };
  const updateCategory = async () => {
    try {
      await updateProductCategory(selectedCategory._id, {
        title,
        parentCategory: finalCategory,
      });
      resetForm();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setParentCategory(event.target.value);
    setFinalCategory(event.target.value);
    getProductSubCategories(event.target.value);
  };

  const handleSubCategory = (event) => {
    setSubCategory(event.target.value);
    setFinalCategory(event.target.value);
  };

  const handleEdit = (value) => {
    setSelectedCategory(value);
    setTitle(value.title);
    if (value.parentCategory) {
      console.log(value);

      const isParent = parentCategories.some(
        (category) => category._id === value?.parentCategory?._id
      );
      if (isParent) {
        setParentCategory(value.parentCategory?._id);
        getProductSubCategories(value?.parentCategory?._id);
      } else {
        getProductSubCategories(value?.parentCategory?.parentCategory);
        setParentCategory(value?.parentCategory?.parentCategory);
        setSubCategory(value?.parentCategory?._id);
      }
    }

    setExpanded(true);
    setEdit(true);
  };

  const deleteCategory = async (value) => {
    try {
      await deleteProductCategory(value._id);
      getProductCategories();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="right-content w-100">
      <Accordion expanded={expanded}>
        <AccordionSummary
          onClick={() => setExpanded(!expanded)}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <h4>{edit ? "Update" : "Add"} Category</h4>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="name">Category Name</label>
                  <input
                    className="w-100 input-class"
                    type="text"
                    placeholder="Enter category name"
                    name="name"
                    id="name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="parentCategory">Parent Category</label>
                  <FormControl size="small" className="w-100">
                    <Select
                      value={parentCategory}
                      onChange={handleCategoryChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Parent Category" }}
                    >
                      <MenuItem value="" disabled>
                        Select a category
                      </MenuItem>
                      {parentCategories.map((category) => (
                        <MenuItem value={category._id} key={category._id}>
                          {category.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="parentCategory">Sub Category</label>
                  <FormControl size="small" className="w-100">
                    <Select
                      value={subCategory}
                      onChange={handleSubCategory}
                      displayEmpty
                      inputProps={{ "aria-label": "Parent Category" }}
                    >
                      <MenuItem value="" disabled>
                        Select sub category
                      </MenuItem>
                      {subcategories.map((category) => (
                        <MenuItem value={category._id} key={category._id}>
                          {category.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="my-3 text-right w-100">
              <Button
                variant="outlined"
                size="medium"
                className="mr-2"
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="mr-3"
                onClick={edit === true ? updateCategory : addCategory}
              >
                {edit === true ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      <div className="card shadow border-0 p-3">
        <h4>Product Categories</h4>
        <div className="table-responsive mt-3">
          <table className="table table-bordered v-align">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th style={{ width: "300px" }}>Name</th>
                <th>Parent Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>
                    <h6>{category?.title}</h6>
                  </td>
                  <td>{category?.parentCategory?.title || "None"}</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button
                        onClick={() => handleEdit(category)}
                        className="success"
                        color="success"
                      >
                        <FaPencilAlt />
                      </Button>
                      <Button
                        onClick={() => deleteCategory(category)}
                        className="error"
                        color="error"
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
