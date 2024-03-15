import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h1>N11 Final Case</h1>
      <p>Click below to view the list of users:</p>
      <Link to="/users" className="btn btn-primary">
        View Users
      </Link>

      <p>Click below to view the list of reviews:</p>
      <Link to="/reviews" className="btn btn-primary">
        View Reviews
      </Link>
    </div>
  );
}
