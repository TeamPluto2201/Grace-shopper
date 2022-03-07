import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderEntryThunkCreator } from "../store/cart";

export default class CartItem extends React.Component {
  constructor(props) {
    super(props);
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
    // await this.props.getOrderEntry(this.props.auth.id);
    console.log("HERE!!!!!!!!orderEntry mounted");
  }

  render() {
    console.log("props--->", this.props);

    return this.props.entryArray.map((entry) => {
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

// function mapStateToProps(state) {
//   return {
//     orderEntry: state.orderEntry,
//     auth: state.auth,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getOrderEntry: (id) => {
//       dispatch(getOrderEntryThunkCreator(id));
//     },
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
