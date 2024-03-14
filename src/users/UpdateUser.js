import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

export default function UpdateUser() {
  let navigate = useNavigate();

  const { id } = useParams();
  const initialUserState = {
    name: "",
    surname: "",
    email: "",
    gender: "",
    latitude: "",
    longitude: "",
  };
  const [user, setUser] = useState(initialUserState);

  const { name, surname, email, gender, latitude, longitude } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/users/${id}`, user);
    navigate("/");
  };

  const resetForm = () => {
    setUser(initialUserState);
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/users/${id}`);
    setUser(result.data.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Update User</div>
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="surname"
                    value={surname}
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
                  <select
                    className="form-control"
                    name="gender"
                    value={gender}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
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
                  Update User
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
