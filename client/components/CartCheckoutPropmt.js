import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CartItem extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    console.log("mounted");
  }

  render() {
    // console.log("props--->", this.props);

    return (
      <div>
        {/* <div> total {order.total} </div>
        <div> total QTY </div> */}
        <button type='button' onClick={this.props.completeCheckout}>Checkout</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderEntry: state.orderEntry,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrderEntry: () => {
      dispatch(getOrderEntryThunkCreator());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
