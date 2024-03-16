import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UpdateReview() {
  let navigate = useNavigate();
  const { id } = useParams();
  const initialReviewState = {
    userId: "",
    restaurantId: "",
    comment: "",
    rate: "",
  };
  const [review, setReview] = useState(initialReviewState);
  const [editComment, setEditComment] = useState(false);
  const [editRating, setEditRating] = useState(false);

  const { userId, restaurantId, comment, rate } = review;

  const onInputChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadReview();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `${process.env.REVIEW_SERVICE_URL}:8080/api/v1/reviews/updateReview/${id}`,
      review
    );
    navigate("/reviews");
  };

  const resetForm = () => {
    setReview(initialReviewState);
  };

  const loadReview = async () => {
    const result = await axios.get(
      `${process.env.REVIEW_SERVICE_URL}:8080/api/v1/reviews/${id}`
    );
    setReview(result.data.data);
  };

  const handleEditComment = () => {
    setEditComment(!editComment);
  };

  const handleEditRating = () => {
    setEditRating(!editRating);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Update Review</div>
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
                    disabled
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
                    disabled
                  />
                </div>
                <div className="form-group mb-3">
                  {editComment ? (
                    <textarea
                      className="form-control"
                      name="comment"
                      value={comment}
                      onChange={(e) => onInputChange(e)}
                    ></textarea>
                  ) : (
                    <p>{comment}</p>
                  )}
                  <span
                    className="material-icons"
                    onClick={handleEditComment}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    edit
                  </span>
                </div>
                <div className="form-group mb-3">
                  {editRating ? (
                    <select
                      className="form-control"
                      name="rate"
                      value={rate}
                      onChange={(e) => onInputChange(e)}
                    >
                      <option value="">Select Rate</option>
                      <option value="ONE">ONE</option>
                      <option value="TWO">TWO</option>
                      <option value="THREE">THREE</option>
                      <option value="FOUR">FOUR</option>
                      <option value="FIVE">FIVE</option>
                    </select>
                  ) : (
                    <p>{rate}</p>
                  )}
                  <span
                    className="material-icons"
                    onClick={handleEditRating}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    edit
                  </span>
                </div>
                <button className="btn btn-primary" type="submit">
                  Update Review
                </button>
                <button
                  className="btn btn-danger"
                  type="reset"
                  onClick={resetForm}
                >
                  Reset
                </button>
                <Link className="btn btn-secondary" to="/reviews">
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
