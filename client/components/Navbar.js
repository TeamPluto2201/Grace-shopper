import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id='navBar'>
    <Link to='/'>
      {" "}
      <img id='logo' src='/headerGraphic-01.png' />{" "}
    </Link>
    <nav>
      {isLoggedIn ? (
        <div id='navClickContainer'>
          <Link to='/cart'>
            {" "}
            <img id='cartIcon' src='/cartIcon-01.png' />{" "}
          </Link>
          {/* The navbar will show these links after you log in */}
          <Link className='navLinks' to='/products'>
            Home
          </Link>
          <a href='#' className='navLinks' onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div id='navClickContainer'>
          {/* The navbar will show these links before you log in */}
          <Link to='/cart'>
            {" "}
            <img id='cartIcon' src='/cartIcon-01.png' />{" "}
          </Link>
          <Link className='navLinks' to='/products'>
            Home
          </Link>
          <Link className='navLinks' to='/login'>
            Login
          </Link>
          <Link className='navLinks' to='/signup'>
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
