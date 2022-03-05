import React from "react";
import { connect } from "react-redux";
import { Switch, Link } from "react-router-dom";
import { getProductsThunkCreator } from "../store/allProducts";
import { getUsersThunkCreator } from "../store/adminDash";

class AdminDash extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadAllProducts();
    this.props.loadAllUsers();
  }

  render() {
    console.log('PROPS in admin dashboard--->', this.props)
    const productsToRender = this.props.products || [];
    const usersToRender = this.props.users || [];
    const isAdmin = this.props.isAdmin;

    return (
      <div>
        {isAdmin ? (
          <div>
            <h1>Admin Dashboard</h1>
            <h3>Products</h3>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Design Name</th>
                  <th>ID</th>
                  <th>Price</th>
                  <th>Update Product</th>
                </tr>
              </thead>
              <tbody>
                {productsToRender.map((element) => {
                  return (
                    <tr key={element.id}>
                      <td className="td-img">
                        <img src={element.imgPath} style={{ width: "100px" }} />
                      </td>
                      <td>{element.designName}</td>
                      <td>{element.id}</td>
                      <td>${element.price}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h3>Users</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Admin</th>
                  <th>Update User</th>
                </tr>
              </thead>
              <tbody>
                {usersToRender.map((element) => {
                  return (
                    <tr key={element.id}>
                      <td>{element.username}</td>
                      <td>{element.isAdmin}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div>Oops! You don't have access to this page.</div>
            <Link to={"/products"}>Back to home page</Link>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    users: state.users,
    isAdmin: !!state.auth.isAdmin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAllProducts: () => {
      dispatch(getProductsThunkCreator());
    },
    loadAllUsers: () => {
      dispatch(getUsersThunkCreator());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDash);
