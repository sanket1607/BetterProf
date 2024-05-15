import React from 'react';

// Define the props for the Buttons component
interface ButtonsProps {
  onClick1: () => void;
  onClick2: () => void;
  onClick3: () => void;
}

// Buttons component
const Buttons: React.FC<ButtonsProps> = ({ onClick1, onClick2, onClick3 }) => {
  return (
    <div>
      <button onClick={onClick1}>Open Dialog 1</button>
      <button onClick={onClick2}>Open Dialog 2</button>
      <button onClick={onClick3}>Open Dialog 3</button>
    </div>
  );
};

export default Buttons;
