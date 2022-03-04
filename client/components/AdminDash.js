import React from "react";
import { connect } from "react-redux";
import { getProductsThunkCreator } from "../store/allProducts";
import { getUsersThunkCreator } from "../store/adminDash";


class AdminDash extends React.Component {
  constructor() {
    super();
  };

  componentDidMount() {
      this.props.loadAllProducts();
      this.props.loadAllUsers();
  };

  render() {
    const productsToRender = this.props.products || [];
    const usersToRender = this.props.users || [];

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h3>
                Products
            </h3>
            <div>
                {productsToRender.map(element => {
                    return (
                        <div key={element.id}>
                            <div>{element.designName}</div>
                            <img src={element.imgPath} style={{width: '100px'}}/>
                            <ul>
                                <li>ID: {element.id}</li>
                                <li>Price: {element.price}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
            <h3>
                Users
            </h3>
            <ul>
                {usersToRender.map(element => {
                    return (
                        <li key={element.id}>
                            {element.username}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
  };
};

function mapStateToProps(state) {
    return {
        products: state.products,
        users: state.users,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loadAllProducts: () => {
            dispatch(getProductsThunkCreator());
        },
        loadAllUsers: () => {
            dispatch(getUsersThunkCreator());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDash);
