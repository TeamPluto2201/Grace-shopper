import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CartItem extends React.Component {
  constructor() {
    super();
    this.state = {
      size: "",
      color: "",
      QTY: "",
      designName: "",
      imgPath: "",
      price: "",
    };
  }

  async componentDidMount() {
    await this.props.getOrderEntry();
  }

  render() {
    console.log("props--->", this.props);

    return props.entryArray.map((entry) => {
      return (
        <div id='productCardAllView' key={entry.id}>
          <img id='shirtImgAll' src={entry.productId.imgPath} />
          <div id='designNameAll'>{entry.productId.designName}</div>
          <div>${entry.productId.price}</div>
          <div>{entry.QTY}</div>
          <div>{entry.size}</div>
          <div>{entry.color}</div>
          <button type='button'>x</button>
        </div>
      );
    });
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
