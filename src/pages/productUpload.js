import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, InputLabel } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { RxCross2 } from "react-icons/rx";

import ListSubheader from "@mui/material/ListSubheader";
import {
  addProduct,
  getProductBrand,
  getProductCategory,
  getProductColor,
  getProductSubCategory,
  updateProduct,
  uploadProductImages,
} from "../utils/apiFunction";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
const ITEM_HEIGHT = 25;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProductUpload = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    quantity: "",
    sold: "",
    images: "",
    color: [],
    tags: [],
    category: "",
    subCategory: "",
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const navigate = useNavigate();
  const handleChange = (event, key) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    const selectedValues = typeof value === "string" ? value.split(",") : value;

    updateInputValue(key, selectedValues);
  };

  const handleUploadImage = async (event) => {
    const { files } = event.target;
    console.log("Selected files:", files);

    const newFiles = Array.from(files);
    console.log("Files array:", newFiles);

    // Convert files to data URLs
    const newImagePreviews = await Promise.all(
      newFiles.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      )
    );

    // Update state with new previews
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newImagePreviews]);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct["images"], ...newFiles],
    }));

    console.log("Updated Image Previews:", newImagePreviews);
  };

  const updateInputValue = (key, value) => {
    console.log(key, value);
    if (key === "category") {
      getProductSubCategories(value);
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      [key]: value,
    }));
    console.log(product);
  };

  const removeImage = (index) => {
    console.log(index);

    // Create new previews without the removed image
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    // Update the imageFiles array (assuming you want to remove the file from the product.images too)
    const updatedFiles = product.images.filter((_, i) => i !== index);

    // Update states
    setImagePreviews(updatedPreviews);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: updatedFiles,
    }));
  };

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
    getProductBrands();
    getProductColors();
    console.log("use effect");
  }, []);

  const menuItems = subCategories.flatMap((category) => {
    if (category.subCategory.length > 0) {
      return [
        <ListSubheader className="main-menu" key={category.title}>
          {category.title}
        </ListSubheader>,
        ...category.subCategory.map((subcat) => (
          <MenuItem className="sub-menu" value={subcat._id} key={subcat._id}>
            {subcat.title}
          </MenuItem>
        )),
      ];
    }
    return [];
  });

  const getProductCategories = async () => {
    try {
      const res = await getProductCategory("parent");
      setCategories(res.data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getProductBrands = async () => {
    try {
      const res = await getProductBrand();
      setBrands(res.data.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  const getProductColors = async () => {
    try {
      const res = await getProductColor();
      setColors(res.data.data);
    } catch (error) {
      throw new Error(error);
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

  const handleAddProduct = async () => {
    try {
      let payload = { ...product };
      delete payload.images;
      const res = await addProduct(payload);
      console.log(res, res.data);

      if (res.data.status === "ok") {
        const id = res.data.product._id;
        console.log(product.images);

        if (product.images.length > 0) {
          let form = new FormData();
          product.images.forEach((image, index) => {
            form.append("images", image);
          });
          const res2 = await uploadProductImages(form);
          if (res2.data.status === "ok") {
            var imageUrls = res2.data.data;
            const res3 = await updateProduct(id, {
              images: imageUrls,
            });
            if (res3.data.status === "ok") {
              setImagePreviews([]);
              setProduct({
                title: "",
                description: "",
                price: "",
                brand: "",
                quantity: "",
                sold: "",
                images: "",
                color: [],
                tags: [],
                category: "",
                subCategory: "",
              });
            }
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card p-3">
          <h4>Add Product</h4>
          <form className="mt-4">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label for="name">Product Name</label>
                  <input
                    className="w-100 input-class"
                    type="text"
                    placeholder="Enter product name"
                    name="name"
                    id="name"
                    onKeyUp={(e) => updateInputValue("title", e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label for="name">Product Description</label>
                  <textarea
                    className="w-100 input-class"
                    type="text"
                    placeholder="Enter product description"
                    name="name"
                    id="name"
                    onKeyUp={(e) =>
                      updateInputValue("description", e.target.value)
                    }
                    rows="3"
                    max="3"
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label for="name">Price</label>
                  <input
                    className="w-100 input-class"
                    type="number"
                    placeholder="Enter product price"
                    name="name"
                    id="name"
                    onKeyUp={(e) => updateInputValue("price", e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label for="name">Brand</label>
                  <FormControl size="small" className="w-100 input-class">
                    <Select
                      inputProps={{ "aria-label": "Without label" }}
                      className="w-100"
                      onChange={(e) =>
                        updateInputValue("brand", e.target.value)
                      }
                      value={product.brand}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select a brand</em>
                      </MenuItem>
                      {brands.map((brand) => (
                        <MenuItem value={brand._id} key={brand._id}>
                          {brand.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label for="name">Category</label>
                  <FormControl
                    id="category"
                    size="small"
                    className="w-100 input-class select-dropdown "
                  >
                    <Select
                      inputProps={{ "aria-label": "Without label" }}
                      className="w-100 "
                      onChange={(e) =>
                        updateInputValue("category", e.target.value)
                      }
                      value={product.category}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select a category
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem value={category._id} key={category._id}>
                          {category.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label for="name">Sub Category</label>
                  <FormControl
                    id="sub-cat"
                    size="small"
                    className="w-100 select-dropdown"
                  >
                    <InputLabel htmlFor="grouped-select">
                      Select sub category
                    </InputLabel>
                    <Select
                      id="grouped-select"
                      className="w-100"
                      onChange={(e) =>
                        updateInputValue("subCategory", e.target.value)
                      }
                      value={product.subCategory}
                    >
                      {menuItems}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label for="name">Quantity</label>
                  <input
                    className="w-100 input-class"
                    type="number"
                    placeholder="Enter product quantity"
                    name="name"
                    id="name"
                    onKeyUp={(e) =>
                      updateInputValue("quantity", e.target.value)
                    }
                  ></input>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label for="name">Color</label>
                  <FormControl
                    sx={{ m: 1, width: 300, mt: 3 }}
                    className="w-100 m-0 select-class"
                  >
                    <Select
                      multiple
                      displayEmpty
                      onChange={(event) => handleChange(event, "color")}
                      input={<OutlinedInput />}
                      value={product.color}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Select color</em>;
                        }

                        return selected.length + " Selected";
                      }}
                      MenuProps={MenuProps}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem disabled value="">
                        <em>Placeholder</em>
                      </MenuItem>
                      {colors.map((color) => (
                        <MenuItem key={color._id} value={color._id}>
                          {color.color}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label for="name">Tags</label>
                  <FormControl
                    sx={{ m: 1, width: 300, mt: 3 }}
                    className="w-100 m-0 select-class"
                  >
                    <Select
                      multiple
                      displayEmpty
                      onChange={(e) => handleChange(e, "tags")}
                      input={<OutlinedInput />}
                      value={product.tags}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Select tags</em>;
                        }

                        return selected.join(", ");
                      }}
                      MenuProps={MenuProps}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem disabled value="">
                        <em>Placeholder</em>
                      </MenuItem>
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div> */}
              <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Images
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleUploadImage}
                    multiple
                  />
                </Button>
              </div>
              {imagePreviews.length > 0 && (
                <div className="col-md-12 my-3">
                  <ImageList
                    sx={{ height: 300 }}
                    cols={5}
                    className="position-relative"
                  >
                    {imagePreviews.map((src, index) => (
                      <ImageListItem key={index}>
                        <img
                          src={src}
                          alt={`Image ${index}`}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                        <RxCross2
                          onClick={(e) => removeImage(index)}
                          className="remove-icon"
                        />
                        <ImageListItemBar
                          title={`${product?.images[index]?.name}`}
                          position="below"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              )}
              <div className="my-3 text-right w-100">
                <Button
                  variant="contained"
                  className="mr-3"
                  onClick={handleAddProduct}
                >
                  Add
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductUpload;
