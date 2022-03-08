import React from "react";

export class OrderConfirmation extends React.Component {
  constructor() {
    super();

    this.sendHome = this.sendHome.bind(this);
  };
  
  sendHome() {
      this.props.history.push('/')
  };

  render() {
    return (
      <div>
        <div>Your order is complete!</div>
        <button onClick={this.sendHome}>Keep shopping</button>
      </div>
    );
  };
};
