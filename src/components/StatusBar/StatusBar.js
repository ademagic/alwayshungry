import React from 'react';
import './statusBar.scss';

function StatusBar(props) {
    return (
        <div className="statusBar">
            {props.label}: {props.value}%
        </div>
    )
}

export default StatusBar;