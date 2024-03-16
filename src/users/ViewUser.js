import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ViewUser() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    gender: "",
    latitude: "",
    longitude: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(
      `${process.env.REVIEW_SERVICE_URL}:8080/api/v1/users/${id}`
    );
    setUser(result.data.data);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-header text-center">
              <h2>User Details</h2>
            </div>
            <div className="card-body">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Name:</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Surname:</th>
                    <td>{user.surname}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email:</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th scope="row">Gender:</th>
                    <td>{user.gender}</td>
                  </tr>
                  <tr>
                    <th scope="row">Latitude:</th>
                    <td>{user.latitude}</td>
                  </tr>
                  <tr>
                    <th scope="row">Longitude:</th>
                    <td>{user.longitude}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-footer text-center">
              <Link className="btn btn-primary" to="/users">
                Back to Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
