import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
const API_URL = "http://localhost:8080/api/items";

const DeleteForm = (props) => {
  const { id } = useParams();
  const [isDeleted, setIsDeleted] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

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
      setImage(itemData.image);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log("Item Deleted:", response.data);
      setIsDeleted(true);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  if (isDeleted) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="row mt-5 mx-5">
      <div className="col-lg-2"></div>
      <div className="col-lg">
        <div className="card shadow-lg p-3">
          <div className="row">
            <div className="col">
              <h1 className="display-2">{props.text}</h1>
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
                    <td><img src={`http://localhost:8080/storage/${image}`} alt={name} height={`150px`}/></td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td className="fw-bold">{name}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td className="fw-bold">${price}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td className="fw-bold">{quantity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="form-text text-center fst-italic">
                Are you Sure you want to delete this Item?
              </p>
            </div>
          </div>
          <form onSubmit={handleDelete}>
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
      <div className="col-lg-2"></div>
    </div>
  );
};

export default DeleteForm;
