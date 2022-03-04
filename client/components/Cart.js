import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderEntriesThunkCreator } from "../store/cart";

class AllOrderEntries extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    await this.props.getAllOrderEntries();
  }

  render() {
    console.log("props--->", this.props);
    const entryArray = this.props.orderEntries || [];

    console.log("entry array", entryArray);
    return (
      <div id='allContainer'>
        <h1 id='pageHeader'>MY CART</h1>
        <div id='wrapContainer'>
          {entryArray.map((entry) => {
            return (
              <div id='productCardAllView' key={entry.id}>
                <img id='shirtImgAll' src={entry.productId.imgPath} />
                <div id='designNameAll'>{entry.productId.designName}</div>
                <div>${entry.productId.price}</div>
                <div>{entry.QTY}</div>
                <div>{entry.size}</div>
                <div>{entry.color}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderEntries: state.orderEntries,
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
