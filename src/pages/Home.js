import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import custom CSS for styling

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to N11 Final Case</h1>
      <div className="section-links">
        <Link to="/users" className="section-link">
          <img src="/images/user-icon.png" alt="Users" />
          <span>View Users</span>
        </Link>
        <Link to="/reviews" className="section-link">
          <img src="/images/star-icon.png" alt="Reviews" />
          <span>View Reviews</span>
        </Link>
        <Link to="/restaurants" className="section-link">
          <img src="/images/restaurant-icon.png" alt="Restaurants" />
          <span>View Restaurants</span>
        </Link>
        <Link to="/logging" className="section-link">
          <img src="/images/log-icon.png" alt="Logs" />
          <span>View Logs</span>
        </Link>
      </div>
    </div>
  );
}
