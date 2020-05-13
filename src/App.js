import React from 'react';
import Squareo from './components/Squareo';
import './ui.scss';

const HEARTBEAT = 1000;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  onReset = () => {
    this.setAlive(true);
    this.setState({
      hungerLevel: 100,
      hungerDepletion: 10,
      energyLevel: 100,
      energyDepletion: 10,
      healthLevel: 100,
      healthDepletion: 10,
      time: 0
    })
  }

  deplete(attr, val) {
    return Math.max(-100, (attr - val));
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

    this.onReset();
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  feed = () => {
    this.setState({hungerLevel: 100});
  }

  onDead = () => {
    this.setAlive(false);
  }

  setAlive(alive){
    document.getElementById('feed').disabled = !alive;
    document.getElementById('reset').disabled = alive;
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
          onDead={this.onDead}
          />
        </div>
        <div className="interactions">
          <button id='feed' onClick={this.feed}>Feed</button>
          <button id='reset' onClick={this.onReset}>Reset</button>
        </div>
      </div>
    )
  };
}

export default App;
