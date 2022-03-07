import React from 'react';
import { connect } from 'react-redux';
import { createProductThunkCreator } from '../store/SingleProduct';

class AddProductForm extends React.Component {
    constructor() {
        super()

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        const newProduct = {
            imgPath: event.target.imgPath.value,
            designName: event.target.designName.value,
            price: event.target.price.value
        };
        this.props.createProduct(newProduct);
    }

    render() {
        return (
            <div>
              <h3>Add Product</h3>
              <form onSubmit={this.handleSubmit}>

                <label>Upload image</label>
                <input type='file' name='imgPath'></input>


                <label>Design Name</label>
                <input type='text' name='designName'></input>

                <label>Price</label>
                <input type='text' name='price'></input>

                <button type="submit">Submit</button>
              </form>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createProduct: (product) => dispatch(createProductThunkCreator(product))
    };
};

export default connect(null, mapDispatchToProps)(AddProductForm);