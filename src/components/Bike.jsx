import React from "react";
import { useNavigate } from "react-router-dom";
import "./Bike.css";

function Bike({ id, image, brand, model, year }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/fuel-info/${id}`);
  };

  return (
    <div className="bike-card" onClick={handleClick}>
      <img src={image} alt={`${brand} ${model}`} className="bike-image" />
      <div className="bike-info">
        <h3>{brand} {model}</h3>
        <p>Year: {year}</p>
      </div>
</div>
  );
}

export default Bike;
