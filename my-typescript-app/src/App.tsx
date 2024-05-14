import React, { useState } from 'react';
import './App.css';
// import { RadarChart } from "./RadarChart";
// import DialogBox from './DialogBox';
// import Button from './Button';
import FilterComponent from './Filter';
import DialogBox from './Dialog';
import { RadarChart } from './RadarChart';
import { Dialog } from '@mui/material';

// function App() {

const App: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDialogClose = (selectedOptions: string[]) => {
    console.log('Selected options:', selectedOptions);
    setIsDialogOpen(false);
  };

  return (
    <div>
    <h1>My App</h1>
    <RadarChart/>
    <FilterComponent />
    <button onClick={() => setIsDialogOpen(true)}>Open Dialog</button>
    <DialogBox isOpen={isDialogOpen} onClose={handleDialogClose} />

  </div>
    // <div className="App">
    //   {/* <img src="uci.png" /> */}
    //   {/* <RadarChart /> */}
    //   <div className="app">
    //     <div className="dialog-button">
    //       <Button onClick={handleOpenDialog} />
    //     </div>
    //     <DialogBox isOpen={isDialogOpen} onClose={handleCloseDialog} />
    //   </div>
    //   <div className="selected-options">
    //     <h3>Selected Options:</h3>
    //     {selectedOptions.map((option, index) => (
    //       <div key={index} className="selected-option">
    //         {option}
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

export default App;
