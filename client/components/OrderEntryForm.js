import React from "react";
import { connect } from "react-redux";
import { getOrderEntriesThunkCreator, addOrderEntryThunkCreator } from "../store/cart";



class OrderEntryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            size: "S",
            color: "white",
            QTY: "1"
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
        const entryObject = { ...this.state, userId: this.props.auth.id, productId: this.props.productId }
        console.log("ENTRYOBJECT********************", entryObject)
        this.props.addToCart(entryObject)

        //needs to call thunk that creates orderEntry 
        //take our local state add the product id that gets passed in to props. 
        //needs to be able to add to a cart regardless of whether someone is logged in or not. 
        //call a thunk that creates a new orderEntry item
    }

    render() {
        console.log("THIS.PROPS.AUTH....................", this.props.auth);
        return (
            <>
                <h3>Order Entry Form</h3>
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
                        <label>Color</label>
                        {/* JOE CR: This is really hard coded, and you may find a eventual ideal scenario is that you
                            request all the possible colors from something like GET /api/colors to fill in this list.
                            I think this is not compatible with how the database is structured right now. 
                        */}
                        <select name='color' onChange={this.handleChange}>
                            <option value={"white"}>white</option>
                            <option value={"black"}>black</option>
                        </select>
                    </div>

                    <div>
                        <label>Qty</label>

                        <input type='number' min='1' name='QTY' value={this.state.name} onChange={this.handleChange} />

                    </div>
                    <div>
                        <button>Add to Cart </button>
                    </div>

                </form>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth

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