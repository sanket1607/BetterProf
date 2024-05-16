import React, { useState, useRef, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql, ApolloProvider, useQuery, useLazyQuery } from '@apollo/client';
import '../styles.css';

// Define the props for the DialogBox component
interface DialogBoxProps {
  isOpen: boolean;
  onClose: (selectedOptions: string[], selectedCourses: string[], selectedStudentIds: string[], group: number) => void;
  group: number;
}

// Create Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:8010/proxy/better-prof/graphql',
  cache: new InMemoryCache()
});

// GraphQL query to fetch available cohort terms
const GET_COHORT_TERMS = gql`
  query {
    getAvailableTerms
  }
`;

// GraphQL query to fetch available courses based on selected terms
const GET_AVAILABLE_COURSES = gql`
  query GetAvailableCourses($terms: [String!]) {
    getAvailableCourses(terms: $terms)
  }
`;

// GraphQL query to fetch student IDs based on selected courses and terms
const GET_STUDENT_IDS = gql`
  query GetStudentIds($courses: [String!], $terms: [String!]) {
    getStudentIds(courses: $courses, terms: $terms)
  }
`;

const DialogBox: React.FC<DialogBoxProps> = ({ isOpen, onClose, group }) => {
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  const [searchQueryTerms, setSearchQueryTerms] = useState<string>('');
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]);
  const [allTerms, setAllTerms] = useState<string[]>([]);

  const [isCourseDropdownVisible, setIsCourseDropdownVisible] = useState<boolean>(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [searchQueryCourses, setSearchQueryCourses] = useState<string>('');
  const [filteredCourses, setFilteredCourses] = useState<string[]>([]);
  const [allCourses, setAllCourses] = useState<string[]>([]);

  const [isStudentIdDropdownVisible, setIsStudentIdDropdownVisible] = useState<boolean>(false);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [searchQueryStudentIds, setSearchQueryStudentIds] = useState<string>('');
  const [filteredStudentIds, setFilteredStudentIds] = useState<string[]>([]);
  const [allStudentIds, setAllStudentIds] = useState<string[]>([]);

  const searchInputRefTerms = useRef<HTMLInputElement | null>(null);
  const searchInputRefCourses = useRef<HTMLInputElement | null>(null);
  const searchInputRefStudentIds = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleRemoveTerm = (term: string) => {
    setSelectedTerms(selectedTerms.filter((item) => item !== term));
  };

  const handleRemoveCourse = (course: string) => {
    setSelectedCourses(selectedCourses.filter((item) => item !== course));
  };

  const handleRemoveStudentId = (studentId: string) => {
    setSelectedStudentIds(selectedStudentIds.filter((item) => item !== studentId));
  };

  const handleSearchChangeTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQueryTerms(value);

    const filtered = allTerms.filter(term =>
      term.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTerms(filtered);
  };

  const handleSearchChangeCourses = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQueryCourses(value);

    const filtered = allCourses.filter(course =>
      course.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleSearchChangeStudentIds = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQueryStudentIds(value);

    const filtered = allStudentIds.filter(studentId =>
      studentId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudentIds(filtered);
  };

  const handleSearchResultClickTerms = (term: string) => {
    setSelectedTerms([...selectedTerms, term]);
    setSearchQueryTerms('');

    const filtered = allTerms.filter(opt => !selectedTerms.includes(opt) && opt.toLowerCase().includes(searchQueryTerms.toLowerCase()));
    setFilteredTerms(filtered);
  };

  const handleSearchResultClickCourses = (course: string) => {
    setSelectedCourses([...selectedCourses, course]);
    setSearchQueryCourses('');

    const filtered = allCourses.filter(opt => !selectedCourses.includes(opt) && opt.toLowerCase().includes(searchQueryCourses.toLowerCase()));
    setFilteredCourses(filtered);
  };

  const handleSearchResultClickStudentIds = (studentId: string) => {
    setSelectedStudentIds([...selectedStudentIds, studentId]);
    setSearchQueryStudentIds('');

    const filtered = allStudentIds.filter(opt => !selectedStudentIds.includes(opt) && opt.toLowerCase().includes(searchQueryStudentIds.toLowerCase()));
    setFilteredStudentIds(filtered);
  };

  const handleClose = () => {
    onClose(selectedTerms, selectedCourses, selectedStudentIds, group);
  };

  const handleSearchFocusTerms = () => {
    setFilteredTerms(allTerms);
  };

  const handleSearchFocusCourses = () => {
    setFilteredCourses(allCourses);
  };

  const handleSearchFocusStudentIds = () => {
    setFilteredStudentIds(allStudentIds);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      setFilteredTerms([]);
      setFilteredCourses([]);
      setFilteredStudentIds([]);
    }
  };

  const [getAvailableCourses, { loading: coursesLoading, error: coursesError, data: coursesData }] = useLazyQuery(GET_AVAILABLE_COURSES);
  const [getStudentIds, { loading: studentIdsLoading, error: studentIdsError, data: studentIdsData }] = useLazyQuery(GET_STUDENT_IDS);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch data using Apollo Client
  const { loading, error, data } = useQuery(GET_COHORT_TERMS, { skip: !isOpen });

  useEffect(() => {
    if (data && data.getAvailableTerms) {
      setAllTerms(data.getAvailableTerms);
      setFilteredTerms(data.getAvailableTerms);
    }
  }, [data]);

  useEffect(() => {
    if (coursesData && coursesData.getAvailableCourses) {
      setAllCourses(coursesData.getAvailableCourses);
      setFilteredCourses(coursesData.getAvailableCourses);
    }
  }, [coursesData]);

  useEffect(() => {
    if (studentIdsData && studentIdsData.getStudentIds) {
      setAllStudentIds(studentIdsData.getStudentIds);
      setFilteredStudentIds(studentIdsData.getStudentIds);
    }
  }, [studentIdsData]);

  const handleShowCoursesDropdown = () => {
    getAvailableCourses({ variables: { terms: selectedTerms } });
    setIsCourseDropdownVisible(true);
  };

  const handleShowStudentIdsDropdown = () => {
    getStudentIds({ variables: { courses: selectedCourses, terms: selectedTerms } });
    setIsStudentIdDropdownVisible(true);
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog" ref={dialogRef}>
        <div className="selected-options">
          <h3>Selected Options for Group {group}:</h3>
          <div className="options-container">
            {selectedTerms.map((term, index) => (
              <div key={index} className="selected-option">
                <span className="option-text">{term}</span>
                <span className="remove-option" onClick={() => handleRemoveTerm(term)}>&#10006;</span>
              </div>
            ))}
          </div>
        </div>
        <div className="search-container">
          <label htmlFor="searchTerm">Term:</label>
          <input
            type="text"
            id="searchTerm"
            placeholder="Search terms"
            value={searchQueryTerms}
            onChange={handleSearchChangeTerms}
            onFocus={handleSearchFocusTerms}
            ref={searchInputRefTerms}
          />
          <div className="search-results">
            {filteredTerms.map((term, idx) => (
              <div key={idx} className="search-result" onClick={() => handleSearchResultClickTerms(term)}>
                {term}
              </div>
            ))}
          </div>
        </div>
        {loading && <p>Loading terms...</p>}
        {error && <p>Error loading terms</p>}

        <button className="plus-button" onClick={handleShowCoursesDropdown}>+</button>

        {isCourseDropdownVisible && (
          <div className="course-container">
            <div className="selected-options">
              <h3>Selected Courses:</h3>
              <div className="options-container">
                {selectedCourses.map((course, index) => (
                  <div key={index} className="selected-option">
                    <span className="option-text">{course}</span>
                    <span className="remove-option" onClick={() => handleRemoveCourse(course)}>&#10006;</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="search-container">
              <label htmlFor="searchCourse">Course:</label>
              <input
                type="text"
                id="searchCourse"
                placeholder="Search courses"
                value={searchQueryCourses}
                onChange={handleSearchChangeCourses}
                onFocus={handleSearchFocusCourses}
                ref={searchInputRefCourses}
              />
              <div className="search-results">
                {filteredCourses.map((course, idx) => (
                  <div key={idx} className="search-result" onClick={() => handleSearchResultClickCourses(course)}>
                    {course}
                  </div>
                ))}
              </div>
            </div>
            {coursesLoading && <p>Loading courses...</p>}
            {coursesError && <p>Error loading courses</p>}

            <button className="plus-button" onClick={handleShowStudentIdsDropdown}>+</button>

            {isStudentIdDropdownVisible && (
              <div className="studentId-container">
                <div className="selected-options">
                  <h3>Selected Student IDs:</h3>
                  <div className="options-container">
                    {selectedStudentIds.map((studentId, index) => (
                      <div key={index} className="selected-option">
                        <span className="option-text">{studentId}</span>
                        <span className="remove-option" onClick={() => handleRemoveStudentId(studentId)}>&#10006;</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="search-container">
                  <label htmlFor="searchStudentId">Student ID:</label>
                  <input
                    type="text"
                    id="searchStudentId"
                    placeholder="Search student IDs"
                    value={searchQueryStudentIds}
                    onChange={handleSearchChangeStudentIds}
                    onFocus={handleSearchFocusStudentIds}
                    ref={searchInputRefStudentIds}
                  />
                  <div className="search-results">
                    {filteredStudentIds.map((studentId, idx) => (
                      <div key={idx} className="search-result" onClick={() => handleSearchResultClickStudentIds(studentId)}>
                        {studentId}
                      </div>
                    ))}
                  </div>
                </div>
                {studentIdsLoading && <p>Loading student IDs...</p>}
                {studentIdsError && <p>Error loading student IDs</p>}
              </div>
            )}
          </div>
        )}

        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

const DialogBoxWithApollo: React.FC<DialogBoxProps> = (props) => (
  <ApolloProvider client={client}>
    <DialogBox {...props} />
  </ApolloProvider>
);

export default DialogBoxWithApollo;
