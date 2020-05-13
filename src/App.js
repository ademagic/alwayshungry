import React from 'react';

import Pet from './components/Pet/Pet';
import StatusBar from './components/StatusBar/StatusBar';

import './ui.scss';

const HEARTBEAT = 1000;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  reset = () => {
    this.setState({
      hungerLevel: 100,
      hungerDepletion: 10,
      energyLevel: 100,
      energyDepletion: 10,
      healthLevel: 100,
      healthDepletion: 10,
      time: 0,
      alive: true
    })
  }

  deplete(attr, val) {
    return Math.max(0, (attr - val));
  }

  depleteHunger() {
    return this.deplete(this.state.hungerLevel, this.state.hungerDepletion);
  }

  increase(attr, val) {
    return Math.min(100, (attr + val));
  }

  componentDidMount() {
    this.reset();

    this.ticker = setInterval(() => {
      this.setState({
        hungerLevel: this.depleteHunger()
      })
    }, HEARTBEAT);
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  feed = () => {
    this.setState({hungerLevel: 100});
  }

  onDead = () => {
    this.setState({alive: false});
  }

  setAlive(alive) {
    document.getElementById('feed').disabled = !alive;
    document.getElementById('reset').disabled = alive;
  }

  render() {
    const { hungerLevel, energyLevel, healthLevel, alive } = this.state;
    return (
      <div className='App'>
        <div className='status'>
          <StatusBar label='hunger' value={hungerLevel}/>
          <StatusBar label='energy' value={energyLevel}/>
          <StatusBar label='health' value={healthLevel}/>
        </div>
        <div className='main'>
          <Pet
          hungerLevel={hungerLevel}
          energyLevel={energyLevel}
          healthLevel={healthLevel}
          isAlive={alive}
          />
        </div>
        <div className='interactions'>
          <button id='feed' onClick={this.feed}>Feed</button>
          <button id='reset' onClick={this.reset}>Reset</button>
        </div>
      </div>
    )
  };
}

export default App;
