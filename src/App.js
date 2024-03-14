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

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addUser" element={<AddUser />} />
          <Route exact path="/updateUser/:id" element={<UpdateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
