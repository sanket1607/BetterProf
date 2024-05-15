import React, { useState, useEffect } from 'react';
import DialogBox from './DialogBox';
import Buttons from './Buttons';
import './styles.css';

const App: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
  });
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string[] }>({
    1: [],
    2: [],
    3: [],
  });

  const [isGenerateGraphEnabled, setIsGenerateGraphEnabled] = useState<boolean>(false);

  const handleDialogOpen = (group: number) => {
    setIsDialogOpen({ ...isDialogOpen, [group]: true });
  };

  const handleDialogClose = (options: string[], group: number) => {
    setSelectedOptions({ ...selectedOptions, [group]: options });
    setIsDialogOpen({ ...isDialogOpen, [group]: false });
  };


  useEffect(() => {

    const anyFiltersSelected = Object.values(selectedOptions).some(options => options.length > 0);

    setIsGenerateGraphEnabled(anyFiltersSelected);

  }, [selectedOptions]);



  return (
    <div>
      <h1>My App</h1>
      <Buttons
        onClick1={() => handleDialogOpen(1)}
        onClick2={() => handleDialogOpen(2)}
        onClick3={() => handleDialogOpen(3)}
      />
      {[1, 2, 3].map((group) => (
        <DialogBox
          key={group}
          isOpen={isDialogOpen[group]}
          onClose={handleDialogClose}
          group={group}
        />
      ))}
      <div>
        <h3>Chosen Filters:</h3>
        {[1, 2, 3].map((group) => (
          <div key={group}>
            <h4>Group {group}:</h4>
            <ul>
              {selectedOptions[group].map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button
        className="generate-graph-button"
        disabled={!isGenerateGraphEnabled}
        onClick={() => console.log('Generate Graph')}
      >
        Generate Graph
      </button>
    </div>
  );
};

export default App;
