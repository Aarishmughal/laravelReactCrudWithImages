import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, Navigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/items";

const UpdateForm = (props) => {
  const { id } = useParams();
  const [isUpdated, setIsUpdated] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [nameOld, setNameOld] = useState("");
  const [priceOld, setPriceOld] = useState("");
  const [quantityOld, setQuantityOld] = useState("");
  const [imageOld, setImageOld] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchItem(id);
  }, [id]);

  const fetchItem = async (itemId) => {
    try {
      const response = await axios.get(`${API_URL}/${itemId}`);
      const itemData = response.data;
      setName(itemData.name);
      setPrice(itemData.price);
      setQuantity(itemData.quantity);
      setNameOld(itemData.name);
      setPriceOld(itemData.price);
      setQuantityOld(itemData.quantity);
      setImageOld(itemData.image);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate form data
    if (!name || !price || !quantity) {
      setErrors({
        name: !name ? "The name field is required." : "",
        price: !price ? "The price field is required." : "",
        quantity: !quantity ? "The quantity field is required." : "",
      });
      return;
    }

    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("price", price);
    // formData.append("quantity", quantity);

    // if (image) {
    //   formData.append("image", image);
    // }

    const formData = {
      "name":name,
      "price":price,
      "quantity":quantity,
      "image":image
    };

    // Log the FormData entries to confirm they are being added correctly
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    try {
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Item updated:", response.data);
      setIsUpdated(true);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("Validation error:", error.response.data);
        setErrors(error.response.data.errors);
      } else {
        console.error("Error updating item:", error);
      }
    }
  };

  // const handleUpdate = async (e) => {
  //   let data = JSON.stringify({
  //     name: name,
  //     price: price,
  //     quantity: quantity,
  //     // image: image,
  //   });
    
  //   let config = {
  //     method: "put",
  //     maxBodyLength: Infinity,
  //     url: `${API_URL}/${id}`,
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     data: data,
  //   };
  //   await axios.request(config).then((response) => {
  //     console.log(JSON.stringify(response.data));
  //     setIsUpdated(true);
  //   }).catch((error) => {
  //       alert(666)
  //       console.log(error);
  //     });

  // };
  if (isUpdated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="row mt-5 mx-5">
      <div className="col-lg">
        <div className="card shadow-lg p-3">
          <div className="row mb-2">
            <div className="col">
              <h1 className="display-2">{props.text}</h1>
              <hr />
            </div>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="row mb-2">
              <div className="col">
                <label className="form-text" htmlFor="name">
                  Name
                </label>
                <input
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                  name="name"
                  id="name"
                />
                {errors.name && (
                  <p className="text-danger text-start">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <label className="form-text" htmlFor="price">
                  Price
                </label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    value={price}
                    name="price"
                    id="price"
                    type="number"
                    step="0.01"
                  />
                </div>
                {errors.price && <p className="text-danger">{errors.price}</p>}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <label className="form-text" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  value={quantity}
                  name="quantity"
                  id="quantity"
                  type="number"
                />
                {errors.quantity && (
                  <p className="text-danger">{errors.quantity}</p>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <label className="form-text" htmlFor="image">
                  Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  name="image"
                  id="image"
                  accept="image/*"
                />
                <p
                  className="form-text fst-italic"
                  style={{ fontSize: "12px" }}
                >
                  Only following file types supported: JPG, JPEG, PNG, PNEG,
                  GIF, SVG. <br />
                  <strong>File size must not exceed 5MB</strong>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-8">
                <button
                  className={props.btnClass}
                  type="submit"
                  style={{ width: "100%" }}
                >
                  {props.btnText}
                </button>
              </div>
              <div className="col">
                <Link
                  to={`/`}
                  className="btn btn-outline-dark"
                  style={{ width: "100%" }}
                >
                  Back
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="card shadow-lg p-3">
          <div className="row">
            <div className="col">
              <h1 className="display-2">Item Summary</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Property Name</th>
                    <th>Data Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Image</td>
                    <td>
                      <img
                        src={`http://localhost:8080/storage/${imageOld}`}
                        alt={nameOld}
                        height={`150px`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td className="fst-italic">{nameOld}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td className="fst-italic">{"$" + priceOld}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td className="fst-italic">{quantityOld}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="form-text text-center fst-italic">
                This is the currently saved Data for the Item.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
