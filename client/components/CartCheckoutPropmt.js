import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import getOrderEntriesTotalThunkCreator from '../store/cartTotal'

class CartItem extends React.Component {
  constructor() {
    super();
    this.state = { 
      orderTotal: 0
    }
  } 

  async componentDidMount() {
    // console.log("mounted");
    // const currentOrderTotal = await this.props.getOrderEntriesTotal()
    // console.log('CURRENT ORDER TOTAL -->',currentOrderTotal)
    // this.setState({orderTotal: currentOrderTotal})
  }

  render() {
    // console.log("props--->", this.props);

    return (
      <div>
        {/* <div> total {order.total} </div>
        <div> total QTY </div> */}
        {/* <div>{this.state.orderTotal}</div> */}
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
    getOrderEntriesTotal: () => {
      dispatch(getOrderEntriesTotalThunkCreator());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
