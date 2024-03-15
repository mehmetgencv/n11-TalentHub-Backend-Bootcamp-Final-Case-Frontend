import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navbarStyle = {
    backgroundColor: "#5c3cbb",
  };

  const logoBackgroundStyle = {
    backgroundColor: "#fbd30c", // Arka plan rengi
    borderRadius: "25%", // Oval şeklinde görüntülemek için border-radius özelliği
    padding: "10px", // Logoya biraz boşluk eklemek için padding özelliği
    boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={navbarStyle}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <div style={logoBackgroundStyle}>
              <img
                src="/n11_logo.png"
                alt="N11 Logo"
                style={{ width: "100px", maxHeight: "50px" }}
              />{" "}
            </div>
            {/* Use img tag with your N11 logo */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
}
