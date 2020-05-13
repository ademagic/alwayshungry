import React from 'react';
import './squareo.scss';

class Squareo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hungerLevel: 100,
            energyLevel: 100,
            healthLevel: 100
        };
    }

    render() {
        return <div className="squareo">
            hi
        </div>
    }
}

export default Squareo;