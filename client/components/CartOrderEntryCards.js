import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderEntryThunkCreator, deleteOrderEntryThunkCreator, updateOrderEntryThunkCreator } from "../store/cart";

// export default 
class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "",
      color: "",
      QTY: "",
      id: ""
      // designName: "",
      // imgPath: "",
      // price: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event) {
    console.log("THIS IS THE CLICK ON THE BUTTON*******", event.target)
    this.props.deleteOrderEntry(event.target.value)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log("this is event on the form ", event.target.value)

    // const changes = {...this.state, event.}
    console.log("This is the state that will be passed into update", this.state)
    this.props.updateOrderEntry(this.state);
  }
  handleClickUpdateButton(event) {
    this.setState({ id: event.target.value })
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
   
    console.log("PROPS INSIDE CART ORDER ENTRY CARD--->", this.props);

    console.log("this.props.entryArray", this.props.entryArray)

    return this.props.entryArray.map((entry) => {

      return (
        <div id='productCardAllView' key={entry.id}>
          <img id='shirtImgAll' src={entry.product.imgPath} />
          <div id='designNameAll'>{entry.product.designName}</div>
          <div>${(entry.product.price / 100).toFixed(2)}</div>
          <div>number of items {entry.QTY}</div>
          <div>size {entry.size}</div>
          {/* <div>color {entry.colorId}</div> */}
          <div>color {entry.color.name}</div>

          <div>Update Item</div>
          <form value={entry.id} onSubmit={this.handleSubmit}>

            <div>
              <label>Size</label>
              <select name='size' onChange={this.handleChange}>

                <option value={"S"}>S</option>
                <option value={"M"}>M</option>
                <option value={"L"}>L</option>

              </select>
            </div>

            <div>
              <label>Color</label>
              <select name='color.name' onChange={this.handleChange}>
                <option value={"white"}>white</option>
                <option value={"black"}>black</option>
              </select>
            </div>

            <div>
              <label>Qty</label>

              <input type='number' min='1' name='QTY' value={this.state.name} onChange={this.handleChange} />

            </div>
            <div>
              <button value={entry.id} type='submit' onClick={this.handleClickUpdateButton}>Update Item </button>
            </div>

          </form>

          <button onClick={this.handleClick} value={entry.id} type='button'>Remove Item</button>
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

function mapDispatchToProps(dispatch) {
  return {
    deleteOrderEntry: (id) => {
      dispatch(deleteOrderEntryThunkCreator(id));
    },

    updateOrderEntry: (item) => {
      dispatch(updateOrderEntryThunkCreator(item))
    }
  };
}


export default connect(null, mapDispatchToProps)(CartItem);
