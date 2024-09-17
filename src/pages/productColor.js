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
  addProductColor,
  deleteProductColor,
  getProductColor,
  updateProductColor,
} from "../utils/apiFunction";
import { IoMdDoneAll } from "react-icons/io";

const ProductColor = () => {
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    getProductColors();
  }, []);

  const getProductColors = async () => {
    try {
      const res = await getProductColor();
      setColors(res.data.data);
    } catch (error) {
      console.error("Failed to fetch color:", error);
    }
  };

  const addColor = async () => {
    try {
      await addProductColor({ color });
      setColor("");
      getProductColors(); // Refresh the list after adding
    } catch (error) {
      console.error("Failed to add color:", error);
    }
  };
  const updateColor = async () => {
    try {
      await updateProductColor(selectedColor._id, {
        color,
      });
      setColor("");
      setSelectedColor(null);
      getProductColors();
    } catch (error) {
      console.error("Failed to add color:", error);
    }
  };

  const handleEdit = (value) => {
    setSelectedColor(value);
    setColor(value.color);

    setEdit(true);
  };

  const deleteColor = async (value) => {
    try {
      await deleteProductColor(value._id);
      getProductColors();
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
          <h4>Add Color</h4>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-9">
                <div className="form-group">
                  <label htmlFor="name">Color Name</label>
                  <input
                    className="w-100 input-class"
                    type="text"
                    placeholder="Enter color name"
                    name="name"
                    id="name"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-3 align-content-center mt-3 ">
                <Button variant="contained" className="mr-3" onClick={addColor}>
                  Add
                </Button>
              </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      <div className="card shadow border-0 p-3">
        <h4>Product Color</h4>
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
              {colors.map((color, index) => (
                <tr key={color.id}>
                  <td>{index + 1}</td>
                  <td>
                    <h6>
                      {selectedColor?._id === color._id && edit ? (
                        <div>
                          <Input
                            placeholder="Edit color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                          />
                          <Button
                            onClick={updateColor}
                            className="success"
                            color="success"
                          >
                            <IoMdDoneAll />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          {color.color}{" "}
                          <Button
                            onClick={() => handleEdit(color)}
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
                      onClick={() => deleteColor(color)}
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

export default ProductColor;
