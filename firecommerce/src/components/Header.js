import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  console.log(cartItems,"from header")
  const {user} = JSON.parse(localStorage.getItem("currentUserCommerce"))

  const logout = () =>{
    localStorage.removeItem("currentUserCommerce")
    window.location.reload()
  }

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link style={{ textDecoration: "none" }} to="/">
            <a className="navbar-brand">Firecommerce</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <FaBars size={25} color="white" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <Link style={{ textDecoration: "none" }} to="/">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page">
                    {user.email.substring(0,user.email.length-10)}
                  </a>
                </li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/orders">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    orders
                  </a>
                </li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/" onClick={logout}>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    logout
                  </a>
                </li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/cart">
                <li className="nav-item">
                  <a className="nav-link" >
                    <FaCartPlus/> {cartItems.length}
                  </a>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
