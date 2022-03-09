import React from "react";

import { Link } from "react-router-dom";

export class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='random'>
        <div id='checkoutCard'>
          <div>Your order is complete!</div>
          <Link id='checkoutLink' to='/'>
            Keep Shopping?
          </Link>
        </div>
      </div>
    );
  }
}
