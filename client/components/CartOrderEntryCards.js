import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getOrderEntryThunkCreator,
  deleteOrderEntryThunkCreator,
  updateOrderEntryThunkCreator,
} from "../store/cart";

// export default
class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "",
      colorId: "",
      QTY: "",
      id: "",
      orderTotal: 0,
      // designName: "",
      // imgPath: "",
      // price: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setOrderEntryId = this.setOrderEntryId.bind(this);
  }

  handleClick(event) {
    console.log("THIS IS THE CLICK ON THE BUTTON*******", event.target);
    try {
      this.props.deleteOrderEntry(event.target.value);
    } catch (err) {
      console.log('Error while Deleting Order Entry', err)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const currentState = this.state;
    console.log('THIS . STATE inside handle submit ->',this.state)

    let orderEntryUpdateObject;
    for (let keys in currentState) {
      console.log(keys);
      if (currentState[keys] !== "") {
        console.log(currentState[keys]);
        orderEntryUpdateObject = {
          ...orderEntryUpdateObject,
          [keys]: currentState[keys],
        };
      }
    }
    console.log('ORDER ENTRY OBJECT -->',orderEntryUpdateObject)
    try {
      this.props.updateOrderEntry(orderEntryUpdateObject);
      // this.props.getOrderEntryThunkCreator();
    } catch (err) {
      console.log('Error while updating order', err)
    }
  }
  handleClickUpdateButton(event) {
    console.log(
      "EVENT.TARGET.VALUE - this should be order entry id ->",
      event.target.value
    );
    this.setState({ id: event.target.value });
  }

  setOrderEntryId(entryId) {
    this.setState({ ...this.state, id: entryId });
  }

  async componentDidMount() {
    // await this.props.getOrderEntry(this.props.auth.id);
    console.log("HERE!!!!!!!!orderEntry mounted");
  }

  // render() {
  //   console.log("PROPS INSIDE CART ORDER ENTRY CARD--->", this.props);
  //   console.log("this.props.entryArray", this.props.entryArray)

  //   return this.props.entryArray.map((entry) => {

  //     return (
  //       <div id='productCardAllView' key={entry.id}>
  //         <img id='shirtImgAll' src={entry.product.imgPath} />
  //         <div id='designNameAll'>{entry.product.designName}</div>
  //         <div>${(entry.product.price / 100).toFixed(2)}</div>
  //         <div>number of items {entry.QTY}</div>
  //         <div>size {entry.size}</div>
  //         {/* <div>color {entry.colorId}</div> */}
  //         <div>color {entry.color.name}</div>
  //         <button value={entry.id} type='button'>Update Item</button>
  //         <button onClick={this.handleClick} value={entry.id} type='button'>Remove Item</button>
  //       </div>
  //     );
  //   });
  // }

  //////////////////////////////////////

  render() {
    // onChange={this.setOrderEntryId(entry.id)

    console.log("THIS.STATE inside CART ORDER ENTRY -->", this.state);
    const orderEntries = this.props.entryArray;
    let sumTotal;
    for (let i = 0; i < orderEntries.length; i++) {
      let price = orderEntries[i].product.price;
      let quantity = orderEntries[i].QTY;
      sumTotal += quantity * price;
    }
    let entryArray = this.props.entryArray || []
    console.log('ENTRY ARRAY --> ', entryArray)

    return entryArray.map((entry) => {
      return (
        <div id="productCardAllView" key={entry.id}>
          <img id="shirtImgAll" src={entry.product.imgPath} />
          <div id="designNameAll">{entry.product.designName}</div>
          <div>${(entry.product.price / 100).toFixed(2)}</div>
          <div>number of items {entry.QTY}</div>
          <div>size {entry.size}</div>
          {/* <div>color {entry.color.id}</div> */}
          <div>color {entry.color.name}</div>

          <div>Update Item</div>
          <form value={entry.id} onSubmit={this.handleSubmit}>
            <div>
              <label>Size</label>
              <select name="size" onChange={this.handleChange}>
                <option value={"S"}>S</option>
                <option value={"M"}>M</option>
                <option value={"L"}>L</option>
              </select>
            </div>

            <div>
              <label>Color</label>
              <select name="colorId" onChange={this.handleChange}>
                <option value={1}>white</option>
                <option value={2}>black</option>
              </select>
            </div>

            <div>
              <label>Qty</label>

              <input
                type="number"
                min="1"
                name="QTY"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button
                value={entry.id}
                type="submit"
                onClick={this.handleClickUpdateButton}
              >
                Update Item
              </button>
            </div>
          </form>

          <button onClick={this.handleClick} value={entry.id} type="button">
            Remove Item
          </button>
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

function mapDispatchToProps(dispatch, { history }) {
  return {
    deleteOrderEntry: (id) => {
      dispatch(deleteOrderEntryThunkCreator(id));
    },
    getOrderEntry: () => {
      dispatch(getOrderEntryThunkCreator());
    },
    updateOrderEntry: (item) => {
      dispatch(updateOrderEntryThunkCreator(item, history));
    },
  };
}

export default connect(null, mapDispatchToProps)(CartItem);
