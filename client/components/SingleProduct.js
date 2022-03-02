import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProductThunkCreator } from "../store/SingleProduct";

class SingleProduct extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    console.log("props in CDM", this.props);
    await this.props.getOneProduct(this.props.match.params.id);
  }

  render() {
    console.log("props--->", this.props);
    // if (this.)

    return (
      <div>
        <div>
          <h1>Welcome to The One Product Page</h1>
          <div>
            <div key={this.props.id}>
              <img src={this.props.product.imgPath} />
              <div>{this.props.product.designName}</div>
              <div>${this.props.product.price}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getOneProduct: (id) => {
      dispatch(getProductThunkCreator(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
