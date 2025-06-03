import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Bike.css";

function FuelInfo() {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [litres, setLitres] = useState("");
  const [pricePerLitre, setPricePerLitre] = useState("");
  const [fuelEntries, setFuelEntries] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(`fuel-${id}`)) || [];
    setFuelEntries(savedData);
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    const totalCost = litres * pricePerLitre;

    const newEntry = {
      date,
      time,
      litres,
      pricePerLitre,
      totalCost,
    };

    const updatedEntries = [...fuelEntries, newEntry];
    setFuelEntries(updatedEntries);
    localStorage.setItem(`fuel-${id}`, JSON.stringify(updatedEntries));

    setDate("");
    setTime("");
    setLitres("");
    setPricePerLitre("");
  };

  const grandTotal = fuelEntries.reduce((sum, entry) => sum + entry.totalCost, 0);

  return (
    <div className="fuel-form-container">
      <h2>Fuel Entry for Bike ID: {id}</h2>
      <form className="fuel-form" onSubmit={handleSave}>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

        <label>Litres:</label>
        <input type="number" value={litres} onChange={(e) => setLitres(e.target.value)} required />

        <label>Price Per Litre:</label>
        <input type="number" value={pricePerLitre} onChange={(e) => setPricePerLitre(e.target.value)} required />

        <p><strong>Total Cost for Entry:</strong> Rs. {(litres && pricePerLitre ? litres * pricePerLitre : 0).toFixed(2)}</p>

        <button type="submit" className="add-btn">Save</button>
      </form>

      <h3>All Fuel Entries:</h3>
      <div className="fuel-entries">
        {fuelEntries.length === 0 ? (
          <p>No fuel records yet.</p>
        ) : (
          fuelEntries.map((entry, index) => (
            <div className="fuel-entry-card" key={index}>
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Time:</strong> {entry.time}</p>
              <p><strong>Litres:</strong> {entry.litres} L</p>
              <p><strong>Price per Litre:</strong> Rs. {entry.pricePerLitre}</p>
              <p><strong>Total Cost:</strong> <span className="total-cost">Rs. {entry.totalCost.toFixed(2)}</span></p>
            </div>
          ))
        )}
      </div>

      {fuelEntries.length > 0 && (
        <div className="grand-total">
          <h3>Grand Total Fuel Cost: <span className="total-cost">Rs. {grandTotal.toFixed(2)}</span></h3>
        </div>
      )}
    </div>
  );
}

export default FuelInfo;
