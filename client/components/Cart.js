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
  };

  async componentDidMount() {
    await this.props.getAllOrderEntries();
  }

  completeCheckout() {
    console.log('completeCheckout initiated...');
    this.setState({
      checkedOut: true,
    });
  };

  render() {
    console.log("PROPS IN CART COMPONENT--->", this.props);
    const entryArray = this.props.orderEntries || [];

    console.log("entry array", entryArray);
    return (
      <div>
        {this.state.checkedOut === true ? (
        <OrderConfirmation />
        ) : (
          <div id='allContainer'>
          <h1 id='pageHeader'>MY CART</h1>
        <div id='wrapContainer'>
          <CartItems entryArray={entryArray} />
          <CartCheckoutPrompt completeCheckout={this.completeCheckout.bind(this)}/>
        </div>
        </div>
        ) }
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
