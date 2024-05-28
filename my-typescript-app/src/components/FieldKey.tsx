// FieldKey.tsx
import React from 'react';
import '../css/fieldKey.css';

const FieldKey: React.FC = () => {
    const fields = [
        { col_name: 'Grade', definition: 'Grade between A+ - D- shown as a percentage. 0% can mean Dropped / below D-' },
        { col_name: 'URG', definition: 'Indicates whether the student belongs to an underrepresented group' },
        { col_name: 'First Gen', definition: 'Indicates whether the student is a first generation student' },
        { col_name: 'Mental Health', definition: 'In the past term my mental health has often affected my academic success (Likert scale question)' },
        { col_name: 'Passing Satisfaction', definition: 'I am satisfied with passing all my classes regardless of the letter grade (Likert scale question)' },
        { col_name: 'Math Background', definition: 'Which of the following courses was or will be your first Math course at the university? (Multiple choice question)' },
        { col_name: 'Sense of Belonging', definition: 'I feel like I belong in the Computing major/minor school. (Likert scale question)' },
        { col_name: 'Leaving CS', definition: 'I have seriously thought about changing to a different major/minor. (Likert scale question)' },
        { col_name: 'Coding Experience', definition: 'Select your prior programming experiences (represents a count of total answers selected)' },
        { col_name: 'Passing Confidence', definition: 'How confident are you that you will pass the class with a C or a higher grade? (Likert scale question)' },
        { col_name: 'Role Models', definition: 'I have positive role models that encourage me to continue in CS. (Likert scale question)' },
        { col_name: 'CS Classmates', definition: 'With how many other students from your CS classes do you spend non-school time?' },
    ];

    return (
        <div className="field-key-container">
            <h3>Field Key</h3>
            <ul>
                {fields.map((field, index) => (
                    <li key={index}>
                        <strong>{field.col_name}</strong>: {field.definition}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FieldKey;
