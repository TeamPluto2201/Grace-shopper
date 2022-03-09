import React from "react";
import { connect } from "react-redux";
import { getOrderEntriesThunkCreator, addOrderEntryThunkCreator } from "../store/cart";
import Colors from './Colors' 


class OrderEntryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            size: "S",
            colorId: 1,
            QTY: 1
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
        try {
            this.props.addToCart(entryObject)
        } catch (err) {
            console.log('Error while creating New Order Entry', err)
        }
    }

    render() {
        console.log('THIS>STATE', this.state)
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
                        <Colors handleChange={this.handleChange.bind(this)}/>
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