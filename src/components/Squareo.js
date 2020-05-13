import React from 'react';
import './squareo.scss';

class Squareo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'hello yo soy squareo'
        };
    }

    render() {
        return (
        <div className="squareo">
            {this.props.hungerLevel}
        </div>
        )
    }
}

export default Squareo;