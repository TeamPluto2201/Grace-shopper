import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsThunkCreator } from "../store/allProducts";

class AllProducts extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    try {
      await this.props.getAllProducts();
    } catch (err) {
      console.log("Error while retrieving All Products", err);
    }
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
              <div className='cardLinks' key={tShirt.id}>
                <Link to={`/products/${tShirt.id}`} id='productCardAllView'>
                  <img id='shirtImgAll' src={tShirt.imgPath} />
                  <div className='cardLinks' id='designNameAll'>
                    {tShirt.designName}
                  </div>
                  <div className='cardLinks'>
                    ${(tShirt.price / 100).toFixed(2)}
                  </div>
                </Link>
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
