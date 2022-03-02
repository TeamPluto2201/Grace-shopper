import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsThunkCreator } from "../store/allProducts";

// designName:
// price:
// img:

// const dummyData = [
//   {
//     id: 1,
//     designName: "A Cool T-shirt",
//     price: 20,
//     img: "https://smwv.org/wp-content/uploads/2021/01/tshirt-2.jpg",
//   },
//   {
//     id: 2,
//     designName: "A Pretty Cool T-shirt",
//     price: 80,
//     img: "https://smwv.org/wp-content/uploads/2021/01/tshirt-2.jpg",
//   },
//   {
//     id: 3,
//     designName: "A Not Very Cool T-shirt",
//     price: 60,
//     img: "https://smwv.org/wp-content/uploads/2021/01/tshirt-2.jpg",
//   },
//   {
//     id: 4,
//     designName: "A Kind Of Cool T-shirt",
//     price: 210,
//     img: "https://smwv.org/wp-content/uploads/2021/01/tshirt-2.jpg",
//   },
//   {
//     id: 5,
//     designName: "A Super Cool T-shirt",
//     price: 220,
//     img: "https://smwv.org/wp-content/uploads/2021/01/tshirt-2.jpg",
//   },
// ];

class AllProducts extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount () {
   await this.props.getAllProducts()
  }

  render() {
    console.log("props--->", this.props);
    // if (this.)
    const tshirtArray = this.props.products || []

    console.log('tshirt array',tshirtArray)
    return (
      <div>
        <div>
          <h1>Welcome to The All Products Page</h1>
          <div>
            {tshirtArray.map((tShirt) => {
              return (
                <div key={tShirt.id}>
                  <img src={tShirt.imgPath} />
                  <div>{tShirt.designName}</div>
                  <div>${tShirt.price}</div>
                </div>
              );
            })}
          </div>
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
