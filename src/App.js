import React from 'react';
import Squareo from './components/Squareo';
import './ui.scss';

const HEARTBEAT = 1000;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hungerLevel: 100,
      hungerDepletion: 10,
      energyLevel: 100,
      energyDepletion: 10,
      healthLevel: 100,
      healthDepletion: 10,
      time: 0
    }
  }

  deplete(attr, val) {
    return Math.max(0, (attr - val));
  }

  depleteHunger () {
    return this.deplete(this.state.hungerLevel, this.state.hungerDepletion);
  }

  componentDidMount() {
    this.ticker = setInterval(() => {
      this.setState({
        hungerLevel: this.depleteHunger()
      })
    }, HEARTBEAT);
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  render() {
    const { hungerLevel, energyLevel, healthLevel } = this.state;
    return (
      <div className="App">
        <div className="status">
          hunger: {hungerLevel}<br/>
        </div>
        <div className="main">
          <Squareo
          hungerLevel={hungerLevel}
          energyLevel={energyLevel}
          healthLevel={healthLevel}
          />
        </div>
        <div className="interactions">
          <button>Feed</button>
        </div>
      </div>
    )
  };
}

export default App;
