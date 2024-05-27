import React, { useState, useEffect } from 'react';
import DialogBox from './components/DialogBox';
import GenerateGraphButton from './components/GenerateGraphButton';
import uciLogo from './uci.png'; // Import the UCI logo
import './css/app.css';

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
  const [selectedCourses, setSelectedCourses] = useState<{ [key: number]: string[] }>({
    1: [],
    2: [],
    3: [],
  });
  const [selectedStudentIds, setSelectedStudentIds] = useState<{ [key: number]: string[] }>({
    1: [],
    2: [],
    3: [],
  });

  const [isGenerateGraphEnabled, setIsGenerateGraphEnabled] = useState<boolean>(false);

  const handleDialogOpen = (group: number) => {
    setIsDialogOpen({ ...isDialogOpen, [group]: true });
  };

  const handleDialogClose = (options: string[], courses: string[], studentIds: string[], group: number) => {
    setSelectedOptions({ ...selectedOptions, [group]: options });
    setSelectedCourses({ ...selectedCourses, [group]: courses });
    setSelectedStudentIds({ ...selectedStudentIds, [group]: studentIds });
    setIsDialogOpen({ ...isDialogOpen, [group]: false });
  };

  useEffect(() => {
    const anyFiltersSelected = Object.values(selectedOptions).some(options => options.length > 0);
    setIsGenerateGraphEnabled(anyFiltersSelected);
  }, [selectedOptions]);

  return (
    <div>
      <div className="header">
        <img src={uciLogo} alt="UCI Logo" className="uci-logo" />
        <h1>BetterProf</h1>
      </div>
      {[1, 2, 3].map((group) => (
        <div key={group} className="group-container">
          <h3>Group {group}</h3>
          <button onClick={() => handleDialogOpen(group)} className="configure-button">
            Configure
          </button>
          <DialogBox
            isOpen={isDialogOpen[group]}
            onClose={(options: string[], courses: string[], studentIds: string[]) => handleDialogClose(options, courses, studentIds, group)}
            group={group}
          />
          <div className="selection-container">
            <h4>Terms:</h4>
            <ul>
              {selectedOptions[group].map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
            <h4>Courses:</h4>
            <ul>
              {selectedCourses[group].map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
            <h4>Student IDs:</h4>
            <ul>
              {selectedStudentIds[group].map((studentId, index) => (
                <li key={index}>{studentId}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <GenerateGraphButton
        isEnabled={isGenerateGraphEnabled}
        selectedStudentIds={selectedStudentIds} // Pass selectedStudentIds to GenerateGraphButton
      />
    </div>
  );
};

export default App;
