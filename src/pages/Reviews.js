import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Reviews() {
  const [Reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/reviews");
      console.log("response", response);
      if (Array.isArray(response.data.data)) {
        setReviews(response.data.data); // Update the state with fetched data
      } else {
        console.error("Invalid data format received:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Reviews:", error);
    }
  };

  const deleteReview = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/reviews/${id}`);
    loadReviews();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Rewiew List</h1>
          <Link className="btn btn-primary" to="/reviews/addReview">
            Add Rewiew
          </Link>
        </div>
        <table className="table border">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Id</th>
              <th scope="col">Restaurant Id</th>
              <th scope="col">Comment</th>
              <th scope="col">Rating</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Reviews.map((review) => (
              <tr key={review.id}>
                <th scope="row">{review.id}</th>
                <td>{review.userId}</td>
                <td>{review.restaurantId}</td>
                <td>{review.comment}</td>
                <td>{review.rate}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary me-2"
                    to={`/reviews/updateReview/${review.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteReview(review.id)}
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
