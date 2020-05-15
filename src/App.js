import React from 'react';

import Pet from './components/Pet/Pet';
import StatusBar from './components/StatusBar/StatusBar';

import './ui.scss';

const HEARTBEAT = 1000;

const BASE_STATS = {
  depletion: {
    energy: 10,
    hunger: 10,
    health: 10
  },
  levels: {
    hunger: 100,
    energy: 100,
    health: 100,
  }
}

const dirtyCloneObj = (obj) => {
  // This feels dirty. Cloning the object by parsing it as json so we can make a copy.
  return JSON.parse(JSON.stringify(obj));
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.stats = dirtyCloneObj(BASE_STATS);

    this.state = {
      time: 0,
      alive: true,
      stats: dirtyCloneObj(this.stats)
    }
  }

  reset = () => {
    this.stats = dirtyCloneObj(BASE_STATS)
    this.setState({
      time: 0,
      alive: true,
      stats: dirtyCloneObj(this.stats)
    });
  }

  deplete(attr) {
    const newValue = Math.max(0, (this.stats.levels[attr] - this.stats.depletion[attr])); 
    this.stats.levels[attr] = newValue;
    return newValue;
  }

  depleteHunger() {
    const hungerLevel = this.deplete('hunger');
    if(hungerLevel === 0){
      this.depleteHealth();
    }
    return hungerLevel;
  }

  depleteHealth() {
    const healthLevel = this.deplete('health');
    if(healthLevel === 0){
      this.setState({alive: false});
    }
    return healthLevel;
  }

  increase(attr, val) {
    return Math.min(100, (this.stats.levels[attr] + val));
  }

  componentDidMount() {
    this.ticker = setInterval(() => {
      this.stats.levels.hunger = this.depleteHunger();
      // We should only update state here if stats have changed
      this.setState({ stats: dirtyCloneObj(this.stats) })
    }, HEARTBEAT);
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  feed = (val) => {
    this.stats.levels.hunger = this.increase('hunger', val);
    this.setState({stats: dirtyCloneObj(this.stats)});
  }

  render() {
    return (
      <div className='App'>
        <div className='status'>
          <StatusBar label='hunger' value={this.stats.levels.hunger}/>
          <StatusBar label='energy' value={this.stats.levels.energy}/>
          <StatusBar label='health' value={this.stats.levels.health}/>
        </div>
        <div className='main'>
          <Pet
          hungerLevel={this.stats.levels.hunger}
          energyLevel={this.stats.levels.energy}
          healthLevel={this.stats.levels.health}
          isAlive={this.state.alive}
          />
        </div>
        <div className='interactions'>
          <button onClick={() => this.feed(1)}>Feed 1</button>
          <button onClick={() => this.feed(7)}>Feed 7</button>
          <button onClick={() => this.feed(18)}>Feed 18</button>
          <button onClick={this.reset}>Reset</button>
        </div>
      </div>
    )
  };
}

export default App;
