import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AddReview() {
  let navigate = useNavigate();
  const initialReviewState = {
    userId: "",
    restaurantId: "",
    comment: "",
    rate: "",
  };
  const [review, setReview] = useState(initialReviewState);

  const { userId, restaurantId, comment, rate } = review;

  const onInputChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "${process.env.REVIEW_SERVICE_URL}:8080/api/v1/reviews",
      review
    );
    navigate("/reviews");
  };

  const resetForm = () => {
    setReview(initialReviewState);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Add a Review</div>
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Id"
                    name="userId"
                    value={userId}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Restaurant Id"
                    name="restaurantId"
                    value={restaurantId}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Comment"
                    name="comment"
                    value={comment}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="rate">Rating:</label>
                  <select
                    className="form-control"
                    name="rate"
                    value={rate}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option value="">Select Rating</option>
                    <option value="ONE">One</option>
                    <option value="TWO">Two</option>
                    <option value="THREE">Three</option>
                    <option value="FOUR">Four</option>
                    <option value="FIVE">Five</option>
                  </select>
                </div>
                <button className="btn btn-primary" type="submit">
                  Add Review
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
