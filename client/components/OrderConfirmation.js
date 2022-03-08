import React from "react";

export class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.sendHome = this.sendHome.bind(this);
  };
  
  sendHome() {
      console.log("MY PROPS >>>>", this.props)
      this.props.history.push('/products');
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
