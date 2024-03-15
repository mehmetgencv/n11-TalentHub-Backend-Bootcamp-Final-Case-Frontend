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
import ViewUser from "./users/ViewUser";
import Reviews from "./pages/Reviews";
import AddReview from "./reviews/AddReview";
import UpdateReview from "./reviews/UpdateReview";
import Restaurants from "./pages/Restaurants";
import AddRestaurant from "./restaurants/AddRestaurant";
import UpdateRestaurant from "./restaurants/UpdateRestaurant";
import LoggingPage from "./pages/LoggingPage";

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
          <Route exact path="/users/viewUser/:id" element={<ViewUser />} />

          <Route exact path="/reviews" element={<Reviews />} />
          <Route exact path="/reviews/addReview" element={<AddReview />} />
          <Route
            exact
            path="/reviews/updateReview/:id"
            element={<UpdateReview />}
          />

          <Route exact path="/restaurants" element={<Restaurants />} />
          <Route
            exact
            path="/restaurants/addRestaurant"
            element={<AddRestaurant />}
          />

          <Route
            exact
            path="/restaurants/updateRestaurant/:id"
            element={<UpdateRestaurant />}
          />

          <Route exact path="/logging" element={<LoggingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
