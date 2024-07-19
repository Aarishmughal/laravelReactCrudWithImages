import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes from react-router-dom

import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import UpdateForm from "./components/UpdateForm";
import DeleteForm from "./components/DeleteForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route
            path="/add"
            element={
              <ItemForm
                text="Add New Item"
                btnText="Add New Item"
                btnClass="btn btn-outline-primary"
              />
            }
          />
          <Route
            path="/update/:id"
            element={
              <UpdateForm
                text="Update Item"
                btnText="Update Item"
                btnClass="btn btn-outline-warning"
              />
            }
          />
          <Route
            path="/delete/:id"
            element={
              <DeleteForm
                text="Confirm Deleting Item"
                btnText="Delete Item"
                btnClass="btn btn-outline-danger"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
