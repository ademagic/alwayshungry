import React from 'react';
import Squareo from './components/Squareo';
import './ui.scss';

function App() {
  return (
    <div className="App">
      <div className="status">
      </div>
      <div className="main">
        <Squareo/>
      </div>
      <div className="interactions">
        <button>SUP</button>
      </div>
    </div>
  );
}

export default App;
