import React from "react";
import { connect } from "react-redux";
import { Switch, Link } from "react-router-dom";
import { getProductsThunkCreator } from "../store/allProducts";

import { getUsersThunkCreator, toggleAdminThunkCreator } from "../store/adminDash";
import { deleteProductThunkCreator } from "../store/SingleProduct";
import EditProductForm from "./EditProductForm";
import AddProductForm from "./AddProductForm";

class AdminDash extends React.Component {
  constructor() {
    super();
    this.state = {
      displayEditForm: 0,
      // displayEditForm will be set to the id of the product that the
      // admin wants to edit so that the edit form will render
    };

    this.editProduct = this.editProduct.bind(this);
  }

  componentDidMount() {
    this.props.loadAllProducts();
    this.props.loadAllUsers();
  }

  editProduct(event) {
    event.preventDefault();
    const productId = event.target.value;
    this.setState({
      ...this.state,
      displayEditForm: productId,
    });
    console.log("state was set...", this.state);
  }

  render() {
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
                  // I added the below "if" condition to try and display the EditProductForm
                  // component based on the local state, but it's not rendering.
                  if (element.id === this.state.displayEditForm) {
                    return <EditProductForm />;
                  } else {
                    3;
                    return (
                      <tr key={element.id}>
                        <td className='td-img'>
                          <img
                            src={element.imgPath}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{element.designName}</td>
                        <td>{element.id}</td>
                        <td>${(element.price / 100).toFixed(2)}</td>
                        <td>
                          <button value={element.id} onClick={this.editProduct}>
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              this.props.deleteProduct(element.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
            <AddProductForm />
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
                      <td>

                        <button onClick={() => {
                          this.props.toggleAdmin(element);
                        }}>Toggle Admin</button>
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
    // editProduct: () => {
    //   <EditProductForm />
    // },
    deleteProduct: (id) => {
      dispatch(deleteProductThunkCreator(id));
    },

    toggleAdmin: (user) => {
      dispatch(toggleAdminThunkCreator(user));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDash);
