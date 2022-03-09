import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderEntriesThunkCreator } from "../store/cart";
import CartItems from "./CartOrderEntryCards";
import CartCheckoutPrompt from "./CartCheckoutPropmt";
import { OrderConfirmation } from "./OrderConfirmation";

class AllOrderEntries extends React.Component {
  constructor() {
    super();
    this.state = {
      checkedOut: false,

    };

    this.completeCheckout = this.completeCheckout.bind(this);
  }

  async componentDidMount() {
    try {
      await this.props.getAllOrderEntries();
    } catch (err) {
      console.log("Error while getting All Order Entries", err);
    }
  }

  completeCheckout() {
    this.setState({
      checkedOut: true,
    });
  }

  render() {
    const entryArray = this.props.orderEntries || [];
    const orderEntries = entryArray;
    let sumTotal = 0;
    for (let i = 0; i < orderEntries.length; i++) {
      let price = orderEntries[i].product.price;
      let quantity = orderEntries[i].QTY;
      sumTotal += quantity * price;
    }

    console.log("entry array", entryArray);
    return (
      <div>
        {this.state.checkedOut === true ? (
          <OrderConfirmation props={this.props} />
        ) : (
          <div id='random'>
            <h1 id='pageHeader'>MY CART</h1>
            <div id='checkout'>
              <div>${(sumTotal / 100).toFixed(2)}</div>
              <CartCheckoutPrompt
                completeCheckout={this.completeCheckout.bind(this)}
              />
            </div>
            <div id='wrapContainer'>
              <CartItems history={this.props.history} entryArray={entryArray} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderEntries: state.cart,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getAllOrderEntries: () => {
      dispatch(getOrderEntriesThunkCreator());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderEntries);
