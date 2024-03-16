import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState("");
  const [restaurantId, setRestaurantId] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      let response;
      if (userId) {
        response = await axios.get(
          `${process.env.REACT_APP_REVIEW_SERVICE_URL}/api/v1/reviews/findAllReviewsByUserId/${userId}`
        );
      } else if (restaurantId) {
        response = await axios.get(
          `${process.env.REACT_APP_REVIEW_SERVICE_URL}/api/v1/reviews/findAllReviewsByRestaurantId/${restaurantId}`
        );
      } else {
        response = await axios.get(
          `${process.env.REACT_APP_REVIEW_SERVICE_URL}/api/v1/reviews`
        );
      }
      console.log("response", response);
      if (Array.isArray(response.data.data)) {
        setReviews(response.data.data);
      } else {
        console.error("Invalid data format received:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Reviews:", error);
    }
  };

  const deleteReview = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_REVIEW_SERVICE_URL}/api/v1/reviews/${id}`
    );
    loadReviews();
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleRestaurantIdChange = (event) => {
    setRestaurantId(event.target.value);
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Review List</h1>
          <div>
            {userId && (
              <button className="btn btn-primary me-2" onClick={loadReviews}>
                List by User Id
              </button>
            )}
            <input
              type="text"
              placeholder="Enter User Id"
              value={userId}
              onChange={handleUserIdChange}
            />
          </div>
          <div>
            {restaurantId && (
              <button className="btn btn-primary me-2" onClick={loadReviews}>
                List by Restaurant Id
              </button>
            )}
            <input
              type="text"
              placeholder="Enter Restaurant Id"
              value={restaurantId}
              onChange={handleRestaurantIdChange}
            />
          </div>
          <Link className="btn btn-primary" to="/reviews/addReview">
            Add Review
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
            {reviews.map((review) => (
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
