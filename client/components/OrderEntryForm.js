import React from "react";
import { connect } from "react-redux";
import { getOrderEntriesThunkCreator } from "../store/cart";


class OrderEntryForm extends React.Component {
    constructor() {
        super()
        this.state = {
            size: "",
            color: "",
            QTY: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        //take our local state add the product id that gets passed in to props. 
        //needs to be able to add to a cart regardless of whether someone is logged in or not. 
        //call a thunk that creates a new orderEntry item
    }

    render() {
        return (
            <>
                <h3>Order Entry Form</h3>
                <form>
                    <div>
                        <label>Size</label>
                        <select name='size' onChange={this.handleChange}>
                            <option value={"L"}>L</option>
                            <option value={"M"}>M</option>
                            <option value={"S"}>S</option>
                        </select>
                    </div>

                    <div>
                        <label>Color</label>
                        <select name='completed' onChange={this.handleChange}>
                            <option value={"white"}>white</option>
                            <option value={"black"}>black</option>
                        </select>
                    </div>

                    <div>
                        <label>Qty</label>

                        <input type='number' name='QTY' value={this.state.name} onChange={this.handleChange} />

                    </div>
                    <div>
                        <button>Add to Cart </button>
                    </div>

                </form>
            </>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//       products: state.products,
//     };
//   }
function mapDispatchToProps(dispatch) {
    return {
        getAllProducts: () => {
            dispatch(getOrderEntriesThunkCreator());
        },
    };
}

export default connect(null, mapDispatchToProps)(OrderEntryForm);