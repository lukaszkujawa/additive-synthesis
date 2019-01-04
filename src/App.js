import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Synth from './Synth';
import Animation from './Animation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Animation width="960" height="425" />
      </div>
    );
  }
}

export default App;
