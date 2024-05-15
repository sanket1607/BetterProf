import React, { useState, useRef, useEffect } from 'react';

// Define the props for the DialogBox component
interface DialogBoxProps {
  isOpen: boolean;
  onClose: (selectedOptions: string[], group: number) => void;
  group: number;
}

// DialogBox component
const DialogBox: React.FC<DialogBoxProps> = ({ isOpen, onClose, group }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const options: string[] = ["test", "test2", "test3"];
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleRemoveOption = (option: string) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);

    const filtered = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSearchResultClick = (option: string) => {
    setSelectedOptions([...selectedOptions, option]);
    setSearchQuery('');
    setFilteredOptions([]);
  };

  const handleClose = () => {
    onClose(selectedOptions, group);
  };

  const handleSearchFocus = () => {
    setFilteredOptions(options);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      setFilteredOptions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog" ref={dialogRef}>
        <div className="selected-options">
          <h3>Selected Options for Group {group}:</h3>
          <div className="options-container">
            {selectedOptions.map((option, index) => (
              <div key={index} className="selected-option">
                <span className="option-text">{option}</span>
                <span className="remove-option" onClick={() => handleRemoveOption(option)}>&#10006;</span>
              </div>
            ))}
          </div>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search options"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            ref={searchInputRef}
          />
          <div className="search-results">
            {filteredOptions.map((option, idx) => (
              <div key={idx} className="search-result" onClick={() => handleSearchResultClick(option)}>
                {option}
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default DialogBox;
