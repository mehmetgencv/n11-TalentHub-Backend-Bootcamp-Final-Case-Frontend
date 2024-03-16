import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Recommendations() {
  const [restaurants, setRestaurants] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    loadRestaurants();
  }, [userId]);

  const loadRestaurants = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_REVIEW_SERVICE_URL}/api/v1/recommendations/${userId}`
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
        </div>
        <table className="table border">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Rate</th>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
              <th scope="col">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <th scope="row">{restaurant.id}</th>
                <td>{restaurant.name}</td>
                <td>{renderStars(restaurant.rate)}</td>
                <td>{restaurant.latitude}</td>
                <td>{restaurant.longitude}</td>
                <td>{restaurant.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="card-footer text-center">
          <Link className="btn btn-primary" to={`/users/viewUser/${userId}`}>
            Back to User
          </Link>
        </div>
      </div>
    </div>
  );
}
