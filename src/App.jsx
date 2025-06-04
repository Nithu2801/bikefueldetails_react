import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Bike from "./components/Bike";
import FuelInfo from "./components/FuelInfo";
import "./components/Bike.css";

function App() {
  const [bikes, setBikes] = useState([
    { id: 111, image: "226908.jpg", brand: "Yamahaa", model: "FZ", year: "2018" },
    { id: 112, image: "226908.jpg", brand: "Hondaa", model: "CBR", year: "2021" },
    { id: 113, image: "226908.jpg", brand: "Bajaaj", model: "Pulsar", year: "2022" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newBike, setNewBike] = useState({
    brand: "",
    model: "",
    year: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBike({ ...newBike, [name]: value });
  };

  const handleAddBike = () => {
    if (newBike.brand && newBike.model && newBike.year && newBike.image) {
      const updatedBike = {
        id: bikes.length + 1,
        ...newBike,
      };
      setBikes([...bikes, updatedBike]);
      setNewBike({ brand: "", model: "", year: "", image: "" });
      setShowForm(false);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bike-container">
            <h1>My Bikes</h1>

            <div className="bike-list">
              {bikes.map((bike) => (
                <Bike key={bike.id} {...bike} />
              ))}
            </div>

            <button className="add-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "Add Car"}
            </button>

            {showForm && (
              <div className="bike-form">
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={newBike.brand}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  value={newBike.model}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  value={newBike.year}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image filename (e.g., bike1.jpg)"
                  value={newBike.image}
                  onChange={handleChange}
                />
                <button className="add-btn" onClick={handleAddBike}>
                  Save Bike
                </button>
              </div>
            )}
          </div>
        }
      />
      <Route path="/fuel-info/:id" element={<FuelInfo />} />
    </Routes>
  );
}

export default App;
