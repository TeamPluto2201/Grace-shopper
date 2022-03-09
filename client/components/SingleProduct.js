import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProductThunkCreator } from "../store/SingleProduct";
import OrderEntryForm from "./OrderEntryForm.js";

class SingleProduct extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    try {
      await this.props.getOneProduct(this.props.match.params.id);
    } catch (err) {
      console.log('Error while retrieving Single Product', err)
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>"{this.props.product.designName}" Shirt</h1>
          <div>
            <div key={this.props.match.params.id}>
              <div>${(this.props.product.price / 100).toFixed(2)}</div>
              <div>
                <OrderEntryForm productId={this.props.match.params.id} productInfo={this.props.product}/>
              </div>
              <img src={this.props.product.imgPath} />
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
