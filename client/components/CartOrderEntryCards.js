import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
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
      currentCart: [],
      orderTotal: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.setOrderEntryId = this.setOrderEntryId.bind(this);
  }

  handleClick(event) {
    console.log("THIS IS THE CLICK ON THE BUTTON*******", event.target);
    try {
      this.props.deleteOrderEntry(event.target.value);
    } catch (err) {
      console.log("Error while Deleting Order Entry", err);
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
    console.log("THIS . STATE inside handle submit ->", this.state);

    let orderEntryUpdateObject;
    for (let keys in currentState) {
      if (currentState[keys] !== "") {
        orderEntryUpdateObject = {
          ...orderEntryUpdateObject,
          [keys]: currentState[keys],
        };
      }
    }
    try {
      this.props.updateOrderEntry(orderEntryUpdateObject);
      // this.props.getOrderEntryThunkCreator();
    } catch (err) {
      console.log("Error while updating order", err);
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

  handleRemove(event) {
    event.preventDefault();
    const currentCart = JSON.parse(localStorage.getItem("guestOrder"));
    const targetIdx = event.target.value;
    currentCart.splice(targetIdx, 1);
    localStorage.setItem("guestOrder", JSON.stringify(currentCart));
    this.setState({
      ...this.state,
      currentCart: currentCart,
    });
  }

  handleEdit(event) {
    event.preventDefault();
    this.setState({ id: event.target.value });
    const currentCart = JSON.parse(localStorage.getItem("guestOrder"));
    const targetIdx = event.target.value;
    const entryToEdit = currentCart[targetIdx];
    if (this.state.size !== "") {
      entryToEdit.size = this.state.size;
      this.setState({ ...this.state, size: "" });
    }
    if (this.state.QTY !== "") {
      entryToEdit.QTY = this.state.QTY;
      this.setState({ ...this.state, QTY: "" });
    }
    console.log("ENTRYYYYYY", entryToEdit);

    if (this.state.color !== "") {
      entryToEdit.color.name = this.state.color.name;

      this.setState({ ...this.state, color: "" });
    }
    currentCart[targetIdx] = entryToEdit;

    localStorage.setItem("guestOrder", JSON.stringify(currentCart));
    this.setState({ ...this.state, currentCart });
    console.log("this.state after", this.state);
  }

  async componentDidMount() {
    // await this.props.getOrderEntry(this.props.auth.id);
    console.log("HERE!!!!!!!!orderEntry mounted");
  }

  render() {
    console.log("PROPS INSIDE CART ORDER ENTRY CARD--->", this.props);

    console.log("this.props.entryArray", this.props.entryArray);

    let cartArray = this.props.entryArray;

    console.log("THIS.STATE inside CART ORDER ENTRY -->", this.state);
    const orderEntries = this.props.entryArray;
    let sumTotal;
    for (let i = 0; i < orderEntries.length; i++) {
      let price = orderEntries[i].product.price;
      let quantity = orderEntries[i].QTY;
      sumTotal += quantity * price;
    }
    let entryArray = this.props.entryArray || [];
    console.log("ENTRY ARRAY --> ", entryArray);

    if (!this.props.isLoggedIn) {
      cartArray = JSON.parse(localStorage.getItem("guestOrder"));

      return cartArray.map((entry) => {
        let selectedColor;
        selectedColor = entry.colorId === 1 ? "white" : "black";
        return (
          <div id="productCardAllView" key={cartArray.indexOf(entry)}>
            <img id="shirtImgAll" src={entry.imgPath} />
            <div id="designNameAll">{entry.designName}</div>
            <div>${(entry.price / 100).toFixed(2)}</div>
            <div>number of items {entry.QTY}</div>
            <div>size {entry.size}</div>
            {/* <div>color {entry.colorId}</div> */}
            <div>color {selectedColor}</div>

            <div>Update Item</div>
            <form value={cartArray.indexOf(entry)} onSubmit={this.handleEdit}>
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
                <select name="color.name" onChange={this.handleChange}>
                  <option value={"white"}>white</option>
                  <option value={"black"}>black</option>
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
                  value={cartArray.indexOf(entry)}
                  type="submit"
                  onClick={this.handleEdit}
                >
                  Update Item{" "}
                </button>
              </div>
            </form>

            <button
              onClick={this.handleRemove}
              value={cartArray.indexOf(entry)}
              type="button"
            >
              Remove Item
            </button>
          </div>
        );
      });
    } else {
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
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

function mapDispatchToProps(dispatch, { history }) {
  return {
    deleteOrderEntry: (id) => {
      dispatch(deleteOrderEntryThunkCreator(id));
    },
    updateOrderEntry: (item) => {
      dispatch(updateOrderEntryThunkCreator(item, history));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
