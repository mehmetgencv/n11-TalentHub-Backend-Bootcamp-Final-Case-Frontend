import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AddRestaurant() {
  let navigate = useNavigate();
  const initialRestaurantState = {
    name: "",
    address: "",
    phone: "",
    email: "",
    latitude: "",
    longitude: "",
    rate: "",
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const { name, address, phone, email, latitude, longitude, rate } = restaurant;

  const onInputChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/api/v1/restaurants", restaurant);
    navigate("/restaurants");
  };

  const resetForm = () => {
    setRestaurant(initialRestaurantState);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Add a Restaurant</div>
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    name="address"
                    value={address}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    placeholder="Latitude"
                    name="latitude"
                    value={latitude}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    placeholder="Longitude"
                    name="longitude"
                    value={longitude}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <button className="btn btn-primary" type="submit">
                  Add Restaurant
                </button>
                <button
                  className="btn btn-danger"
                  type="reset"
                  onClick={resetForm}
                >
                  Reset
                </button>
                <Link className="btn btn-secondary" to="/">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
