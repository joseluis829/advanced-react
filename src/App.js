import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Usage from './components/09.jsx';
//import { Toggle } from "./components/01.jsx";

class App extends Component {

  

  render() {

    const onToggle = (...args) => console.log('onToggle', ...args)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/*<Toggle onToggle={onToggle} />*/}
        {Usage({onToggle})}


      </div>
    );
  }
}

export default App;
