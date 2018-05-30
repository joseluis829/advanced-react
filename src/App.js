import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toggle from "./components/Toggle";
import Demo from "./components/Demo/Demo";
import { DataTabs } from "./components/Tabs/Tabs.1";

class App extends Component {
  render() {

    const data = [
      {label: 'Tacos', description: <p>Tacos are good</p>},
      {label: 'Burritos', description: <p>Burritos are good too</p>}
    ]

    return (
      <div className="App">
        
        <Toggle onToggle={on => console.log('toggle', on)} > 
          <Toggle.On>The button is on</Toggle.On>
          <Toggle.Off>The button is off</Toggle.Off>
          <Toggle.Button />
        </Toggle>

        <div>
          <DataTabs data={data} />
        </div>

        <Demo />

      </div>
    );
  }
}

export default App;
