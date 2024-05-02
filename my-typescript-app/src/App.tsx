import React from 'react';
import './App.css';
import { ResponsiveRadar } from '@nivo/radar'
import { RadarChart } from "./RadarChart";

function App() {
  return (
    <div className="App">
      <img src="uci.png" alt="My Image"/>
      Pep
      <RadarChart />
    </div>
  );
}

export default App;
