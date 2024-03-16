import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get(
        "${process.env.REVIEW_SERVICE_URL}:8080/api/v1/users"
      );
      console.log("response", response);
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data); // Update the state with fetched data
      } else {
        console.error("Invalid data format received:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(
      `${process.env.REVIEW_SERVICE_URL}:8080/api/v1/users/${id}`
    );
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>User List</h1>
          <Link className="btn btn-primary" to="/users/addUser">
            Add User
          </Link>
        </div>
        <table className="table border">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary me-2"
                    to={`/users/viewUser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary me-2"
                    to={`/users/updateUser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
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
