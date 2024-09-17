import React, { useEffect, useState } from "react";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Input,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  addProductBrand,
  deleteProductBrand,
  getProductBrand,
  updateProductBrand,
} from "../utils/apiFunction";
import { IoMdDoneAll } from "react-icons/io";

const ProductBrand = () => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    getProductBrands();
  }, []);

  const getProductBrands = async () => {
    try {
      const res = await getProductBrand();
      setBrand(res.data.data);
    } catch (error) {
      console.error("Failed to fetch brand:", error);
    }
  };

  const addBrand = async () => {
    try {
      await addProductBrand({ title });
      setTitle("");
      getProductBrands(); // Refresh the list after adding
    } catch (error) {
      console.error("Failed to add brand:", error);
    }
  };
  const updateBrand = async () => {
    try {
      await updateProductBrand(selectedBrand._id, {
        title,
      });
      setTitle("");
      setSelectedBrand(null);
      getProductBrands();
    } catch (error) {
      console.error("Failed to add brand:", error);
    }
  };

  const handleEdit = (value) => {
    setSelectedBrand(value);
    setTitle(value.title);

    setEdit(true);
  };

  const deleteBrand = async (value) => {
    try {
      await deleteProductBrand(value._id);
      getProductBrands();
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
          <h4>Add Brand</h4>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-9">
                <div className="form-group">
                  <label htmlFor="name">Brand Name</label>
                  <input
                    className="w-100 input-class"
                    type="text"
                    placeholder="Enter brand name"
                    name="name"
                    id="name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-3 align-content-center mt-3 ">
                <Button variant="contained" className="mr-3" onClick={addBrand}>
                  Add
                </Button>
              </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      <div className="card shadow border-0 p-3">
        <h4>Product Brand</h4>
        <div className="table-responsive mt-3">
          <table className="table table-bordered v-align">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: "30px" }}>UID</th>
                <th>Name</th>

                <th style={{ width: "30px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {brand.map((brand, index) => (
                <tr key={brand.id}>
                  <td>{index + 1}</td>
                  <td>
                    <h6>
                      {selectedBrand?._id === brand._id && edit ? (
                        <div>
                          <Input
                            placeholder="Edit title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          <Button
                            onClick={updateBrand}
                            className="success"
                            color="success"
                          >
                            <IoMdDoneAll />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          {brand.title}{" "}
                          <Button
                            onClick={() => handleEdit(brand)}
                            className="success"
                            color="success"
                          >
                            <FaPencilAlt />
                          </Button>
                        </div>
                      )}
                    </h6>
                  </td>
                  <td>
                    <Button
                      onClick={() => deleteBrand(brand)}
                      className="error"
                      color="error"
                    >
                      <MdDelete />
                    </Button>
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

export default ProductBrand;
