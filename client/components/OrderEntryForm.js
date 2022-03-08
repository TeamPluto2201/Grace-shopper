import React from "react";
import { connect } from "react-redux";
import {
  getOrderEntriesThunkCreator,
  addOrderEntryThunkCreator,
} from "../store/cart";
import Colors from "./Colors";

class OrderEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "S",
      color: "1",
      QTY: "1",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('PROPS INSIDE ORDER ENTRY FORM >>>>>>', this.props)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log("STATE HANDLE CHANGE order entry form  -->", this.state);
    console.log("EVENT.TARGET.VALUE", event.target.value);
  }

  handleSubmit(event) {
    if (this.props.isLoggedIn) {
      console.log("STATE HANDLE SUBMIT order entry form", this.state);
      event.preventDefault();
      const entryObject = {
        ...this.state,
        userId: this.props.auth.id,
        productId: this.props.productId,
      };
      this.props.addToCart(entryObject);
      //needs to call thunk that creates orderEntry
      //take our local state add the product id that gets passed in to props.
      //needs to be able to add to a cart regardless of whether someone is logged in or not.
      //call a thunk that creates a new orderEntry item
    } else {
      event.preventDefault();
      //create object of orderEntry,
      const newlyPlacedGuestOrderEntry = {
        size: this.state.size,
        colorId: this.state.color,
        QTY: this.state.QTY,
        productId: this.props.productInfo.id,
        orderId: -1,
        imgPath: this.props.productInfo.imgPath,
        price: this.props.productInfo.price
      };
      if (!localStorage.guestOrder) {
        // localStorage.setItem("guestOrder", ['HELLOOOOO']);
        //const updateStorage = localStorage.getItem("guestOrder");
        const updateStorage = [];
      updateStorage.push(newlyPlacedGuestOrderEntry);
      localStorage.setItem('guestOrder', JSON.stringify(updateStorage));
      } else {
        //push that object to local storage in an array of order Entries whose order id = -1
        const addToStorage = JSON.parse(localStorage.getItem('guestOrder'));
        addToStorage.push(newlyPlacedGuestOrderEntry);
        localStorage.setItem('guestOrder', JSON.stringify(addToStorage));
      }
    }
  }

  render() {
    console.log("THIS>STATE", this.state);
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Size</label>
            <select name='size' onChange={this.handleChange}>
              <option value={"S"}>S</option>
              <option value={"M"}>M</option>
              <option value={"L"}>L</option>
            </select>
          </div>
          <div>
            {/* <label>Color</label>
                        <select name='color' onChange={this.handleChange}>
                            <option value={"white"}>white</option>
                            <option value={"black"}>black</option>
                        </select> */}
            <Colors handleChange={this.handleChange.bind(this)} />
          </div>

          <div>
            <label>Qty</label>

            <input
              type='number'
              min='1'
              name='QTY'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button>Add to Cart </button>
          </div>
        </form>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    isLoggedIn: state.isLoggedIn,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getAllProducts: () => {
      dispatch(getOrderEntriesThunkCreator());
    },

    addToCart: (entryToCreate) => {
      dispatch(addOrderEntryThunkCreator(entryToCreate));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEntryForm);
