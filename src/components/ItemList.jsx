import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/items";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  return (
    <div className="row m-5">
      <div className="col-lg">
        <div className="card shadow-lg p-3">
          <div className="row">
            <div className="col-lg">
              <h1 className="display-2">Stored Items</h1>
              <hr />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg">
              <Link to={`/add`} className="btn btn-outline-primary">
                Add New Item
              </Link>
            </div>
          </div>
          <div className="row px-3">
            <div className="col-lg">
              <table className="table table-hover table-bordered table-sm">
                <thead className="border">
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Options</th>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr>
                      <td>{item.id}</td>
                      <td className="p-1"><img src={`http://localhost:8080/storage/${item.image}`} alt={item.name} height={`100px`}/></td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td className="p-1">
                        <div className="d-flex justify-content-center">
                          <Link
                            to={`/update/${item.id}`}
                            className="btn btn-warning me-2"
                            id="editBtn"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                            </svg>
                          </Link>
                          <Link
                            to={`/delete/${item.id}`}
                            className="btn btn-danger"
                            id="delBtn"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
