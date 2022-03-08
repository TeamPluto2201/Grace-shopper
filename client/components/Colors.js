import React from 'react';


class Color extends React.Component {
    constructor() {
        super()
    }

    render() {
        //<option value={'1'}>white</option>
        return(
            <div>
                <select name='color' onChange={this.props.handleChange}>
                <option value={1}>white</option>
                <option value={2}>black</option>
                </select>
            </div>
        )
    }
        
}


export default Color

