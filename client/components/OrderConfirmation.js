import React from "react";
import { Link } from "react-router-dom";

export class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Your order is complete!</div>
        <Link to='/'>Keep shopping</Link>
      </div>
    );
  }
}
