import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsThunkCreator } from "../store/allProducts";

class AllProducts extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    await this.props.getAllProducts();
  }

  render() {
    console.log("props--->", this.props);
    // if (this.)
    const tshirtArray = this.props.products || [];

    console.log("tshirt array", tshirtArray);
    return (
      <div id='allContainer'>
        <h1 id='pageHeader'>ALL PRODUCTS</h1>
        <div id='wrapContainer'>
          {tshirtArray.map((tShirt) => {
            return (
              <div id='productCardAllView' key={tShirt.id}>
                <img id='shirtImgAll' src={tShirt.imgPath} />
                <div id='designNameAll'>{tShirt.designName}</div>
                <div>${tShirt.price}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getAllProducts: () => {
      dispatch(getProductsThunkCreator());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
