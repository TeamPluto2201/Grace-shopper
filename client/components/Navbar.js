import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id='navBar'>
    <img id='logo' src='/headerGraphic-01.png' />

    <nav>
      {isLoggedIn ? (
        <div>
          <img id='cartIcon' src='/cartIcon-01.png' />
          {/* The navbar will show these links after you log in */}
          <Link className='navLinks' to='/products'>
            Home
          </Link>
          <a href='#' onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <img id='cartIcon' src='/cartIcon-01.png' />
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
