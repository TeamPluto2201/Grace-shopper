import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Welcome from "./components/Welcome";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import AdminDash from "./components/AdminDash";
import Cart from "./components/Cart";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const isAdmin = this.props.isAdmin;

    return (
      <div>
        {isAdmin && isLoggedIn ? (
          <div>
            {/* <AdminDash /> */}
            <Link id='viewDash' className='navLinks' to={"/admin"}>
              View Dashboard
            </Link>
          </div>
        ) : (
          <div>
            {isLoggedIn ? (
              <div>
                {/* <Route path="/home" component={Home} /> */}
                <Welcome />
                {/* <Route path='/AllProducts' component={AllProducts} /> */}
                {/* <Redirect to="/home" /> */}
              </div>
            ) : (
              <div>
                {/* <Route path='/' exact component={ Login } /> */}
                {/* <Login />
              <Signup /> */}
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
              </div>
            )}
          </div>
        )}

        <Route exact path='/' component={AllProducts} />
        <Route exact path='/products' component={AllProducts} />
        <Route exact path='/products/:id' component={SingleProduct} />
        <Route exact path='/admin' component={AdminDash} />
        <Route exact path='/cart' component={Cart} />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
