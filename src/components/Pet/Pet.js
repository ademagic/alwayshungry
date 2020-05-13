import React from 'react';
import './pet.scss';

const STATUS_MESSAGES = [
    {
        valueFrom: 75,
        message: 'I\'m peckish'
    },
    {
        valueFrom: 50,
        message: 'I\'m getting pretty hungry'
    },
    {
        valueFrom: 25,
        message: 'I\'m starving, feed me'
    },
    {
        valueFrom: 0,
        message: 'x . x'
    }
];

function Pet(props) {
    let statusMessage = 'Woof.';

    for (let i = 0; i < STATUS_MESSAGES.length; i++) {
        if (!props.isAlive) {
            statusMessage = STATUS_MESSAGES.find(msg => msg.valueFrom === 0);
            statusMessage = statusMessage.message;
        }

        if (props.hungerLevel <= STATUS_MESSAGES[i].valueFrom) {
            statusMessage = STATUS_MESSAGES[i].message;
        }
    }

    return (
        <div className="pet">
            {statusMessage}
        </div>
    )
}

export default Pet;