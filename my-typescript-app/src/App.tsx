import React, { useState } from 'react';
import './App.css';
import { ResponsiveRadar } from '@nivo/radar';
import { RadarChart } from "./RadarChart";
import DialogBox from './DialogBox';
import Button from './Button';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (options: string[]) => {
    setIsDialogOpen(false);
    setSelectedOptions(options);
  };

  return (
    <div className="App">
      <img src="uci.png" alt="My Image" />
      Pep
      <RadarChart />
      <div className="app">
        <div className="dialog-button">
          <Button onClick={handleOpenDialog} />
        </div>
        <DialogBox isOpen={isDialogOpen} onClose={handleCloseDialog} />
      </div>
      <div className="selected-options">
        <h3>Selected Options:</h3>
        {selectedOptions.map((option, index) => (
          <div key={index} className="selected-option">
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
