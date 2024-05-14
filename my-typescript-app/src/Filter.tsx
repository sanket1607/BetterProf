import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel } from '@mui/material';

// Define the type for the filters
interface Filters {
  filter1: boolean;
  filter2: boolean;
  filter3: boolean;
}

// Define the props for the FilterDialog component
interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (filters: Filters) => void;
  title: string;
}

// FilterDialog component
const FilterDialog: React.FC<FilterDialogProps> = ({ open, onClose, onSave, title }) => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    filter1: false,
    filter2: false,
    filter3: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters({
      ...selectedFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSave = () => {
    onSave(selectedFilters);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedFilters.filter1}
              onChange={handleCheckboxChange}
              name="filter1"
            />
          }
          label="Filter 1"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedFilters.filter2}
              onChange={handleCheckboxChange}
              name="filter2"
            />
          }
          label="Filter 2"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedFilters.filter3}
              onChange={handleCheckboxChange}
              name="filter3"
            />
          }
          label="Filter 3"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

// FilterComponent main component
const FilterComponent: React.FC = () => {
  const [group1Filters, setGroup1Filters] = useState<Filters | null>(null);
  const [group2Filters, setGroup2Filters] = useState<Filters | null>(null);
  const [group3Filters, setGroup3Filters] = useState<Filters | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentGroup, setCurrentGroup] = useState<number | null>(null);

  const handleOpenDialog = (group: number) => {
    setCurrentGroup(group);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveFilters = (filters: Filters) => {
    if (currentGroup === 1) {
      setGroup1Filters(filters);
    } else if (currentGroup === 2) {
      setGroup2Filters(filters);
    } else if (currentGroup === 3) {
      setGroup3Filters(filters);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog(1)}>
        Choose Filter for Group 1
      </Button>

      {group1Filters && (
        <>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog(2)}>
            Choose Filter for Group 2
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog(3)}>
            Choose Filter for Group 3
          </Button>
          <Button variant="contained" color="secondary" onClick={() => console.log('Generate Graph')}>
            Generate Graph
          </Button>
        </>
      )}

      {group2Filters && !group3Filters && (
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog(3)}>
          Choose Filter for Group 3
        </Button>
      )}

      <FilterDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveFilters}
        title={`Choose Filters for Group ${currentGroup}`}
      />
    </div>
  );
};

export default FilterComponent;
