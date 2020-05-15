import React from 'react';
import './pet.scss';

const STATUS_MESSAGES = [
    {
        valueFrom: 75,
        message: 'u . u'
    },
    {
        valueFrom: 50,
        message: 'o . o'
    },
    {
        valueFrom: 25,
        message: '* . *'
    },
    {
        valueFrom: 0,
        message: '- . x'
    },
    // DEATH
    {
        valueFrom: -100,
        message: 'X . x'
    }
];

function Pet(props) {
    let statusMessage = '^ . ^';

    for (let i = 0; i < STATUS_MESSAGES.length; i++) {
        if (!props.isAlive) {
            statusMessage = STATUS_MESSAGES.find(msg => msg.valueFrom === -100);
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