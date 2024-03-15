import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UpdateRestaurant() {
  let navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    loadRestaurant();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8081/api/v1/restaurants/${id}`,
      restaurant
    );
    navigate("/restaurants");
  };

  const resetForm = () => {
    setRestaurant(initialRestaurantState);
  };

  const loadRestaurant = async () => {
    const result = await axios.get(
      `http://localhost:8081/api/v1/restaurants/${id}`
    );
    setRestaurant(result.data.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Update Restaurant</div>
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
                  Update Restaurant
                </button>
                <button
                  className="btn btn-danger"
                  type="reset"
                  onClick={resetForm}
                >
                  Reset
                </button>
                <Link className="btn btn-secondary" to="/restaurants">
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
