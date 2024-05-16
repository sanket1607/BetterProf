import React, { useState, useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_NORMALISED_STUDENT_MEAN } from '../queries';
import { RadarChart } from './RadarChart';
import '../styles.css';

interface GenerateGraphButtonProps {
  isEnabled: boolean;
  selectedStudentIds: { [key: string]: string[] };
}

const GenerateGraphButton: React.FC<GenerateGraphButtonProps> = ({ isEnabled, selectedStudentIds }) => {
  const [getNormalisedStudentMean] = useLazyQuery(GET_NORMALISED_STUDENT_MEAN);
  const [results, setResults] = useState<{ [key: string]: any }>({});
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [loadingGroups, setLoadingGroups] = useState<number>(0);

  const handleClick = () => {
    const populatedGroups = Object.keys(selectedStudentIds).filter(group => selectedStudentIds[group].length > 0);
    setIsDataFetched(false); // Reset data fetched state on each click
    setLoadingGroups(populatedGroups.length); // Set the number of groups being loaded

    populatedGroups.forEach((group) => {
      getNormalisedStudentMean({
        variables: {
          studentIds: selectedStudentIds[group], // Use selectedStudentIds for the query
        },
      }).then(response => {
        const data = response.data.getNormalisedStudentMean;
        setResults(prevResults => ({
          ...prevResults,
          [group]: data,
        }));
        setLoadingGroups(prevLoadingGroups => prevLoadingGroups - 1);
      }).catch(err => {
        console.error(err);
        setLoadingGroups(prevLoadingGroups => prevLoadingGroups - 1);
      });
    });
  };

  useEffect(() => {
    if (loadingGroups === 0 && Object.keys(results).length > 0) {
      setIsDataFetched(true);
    }
  }, [loadingGroups, results]);

  const mapResultsToDataFormat = useCallback((results: { [key: string]: any }) => {
    const fields = [
      { field: 'Coding Experience', key: 'codingExperience' },
      { field: 'Grade', key: 'grade' },
      { field: 'CS Classmates', key: 'hangsOutWithCSClassmates' },
      { field: 'Leaving CS', key: 'hasConsideredLeavingCS' },
      { field: 'Role Models', key: 'hasRoleModels' },
      { field: 'First Gen', key: 'isFirstGen' },
      { field: 'URG', key: 'isURG' },
      { field: 'Math Background', key: 'mathBackground' },
      { field: 'Mental Health', key: 'mentalHealth' },
      { field: 'Passing Confidence', key: 'passingConfidence' },
      { field: 'Passing Satisfaction', key: 'passingSatisfaction' },
      { field: 'Sense of Belonging', key: 'senseOfBelonging' },
    ];

    const data = fields.map(field => {
      const entry: { [key: string]: any } = { field: field.field };
      Object.keys(results).forEach(group => {
        let value = results[group] && typeof results[group][field.key] === 'number' ? results[group][field.key] : 0;
        // Ensure the value is a number
        value = isNaN(value) ? 0 : value;
        entry[`Group ${group}`] = value;
      });
      return entry;
    });

    return data;
  }, [results]);

  const formattedData = isDataFetched ? mapResultsToDataFormat(results) : [];
  const populatedGroups = Object.keys(selectedStudentIds).filter(group => selectedStudentIds[group].length > 0);
  const keys = populatedGroups.map(group => `Group ${group}`);

  return (
    <div>
      <button 
        className="generate-graph-button" 
        disabled={!isEnabled} 
        onClick={handleClick}
      >
        Generate Graph
      </button>
      {isDataFetched && populatedGroups.length > 0 && (
        <RadarChart data={formattedData} keys={keys} />
      )}
    </div>
  );
};

export default GenerateGraphButton;
