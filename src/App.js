import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import AddUser from "./users/AddUser";
import UpdateUser from "./users/UpdateUser";
import Users from "./pages/Users";
import Reviews from "./pages/Reviews";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/users/addUser" element={<AddUser />} />
          <Route exact path="/users/updateUser/:id" element={<UpdateUser />} />
          

          <Route exact path="/reviews" element={<Reviews />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
