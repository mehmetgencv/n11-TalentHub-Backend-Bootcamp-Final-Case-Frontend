import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const response = await axios.get(
        "${process.env.RESTAURANT_SERVICE_URL}:8081/api/v1/restaurants"
      );
      console.log("response", response);
      if (Array.isArray(response.data.data)) {
        setRestaurants(response.data.data); // Update the state with fetched data
      } else {
        console.error("Invalid data format received:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const deleteRestaurant = async (id) => {
    await axios.delete(
      `${process.env.RESTAURANT_SERVICE_URL}:8081/api/v1/restaurants/${id}`
    );
    loadRestaurants();
  };

  const renderStars = (rate) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rate) {
        stars.push(<StarIcon key={i} />);
      } else {
        stars.push(<StarBorderIcon key={i} />);
      }
    }
    return (
      <>
        <span>{stars}</span>
        <span>({rate})</span>
      </>
    );
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Restaurant List</h1>
          <Link className="btn btn-primary" to="/restaurants/addRestaurant">
            Add Restaurant
          </Link>
        </div>
        <table className="table border">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Rate</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <th scope="row">{restaurant.id}</th>
                <td>{restaurant.name}</td>
                <td>{renderStars(restaurant.rate)}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.phone}</td>
                <td>{restaurant.email}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary me-2"
                    to={`/restaurants/updateRestaurant/${restaurant.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteRestaurant(restaurant.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
