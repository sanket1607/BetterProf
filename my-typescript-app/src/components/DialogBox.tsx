import React, { useState, useRef, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useLazyQuery } from '@apollo/client';
import { CSSTransition } from 'react-transition-group';
import '../css/dialog.css';
import { GET_COHORT_TERMS, GET_AVAILABLE_COURSES, GET_STUDENT_IDS } from '../queries';

interface DialogBoxProps {
  isOpen: boolean;
  onClose: (selectedOptions: string[], selectedCourses: string[], selectedStudentIds: string[], allStudentIds: string[], group: number) => void;
  group: number;
}

const client = new ApolloClient({
  uri: 'http://localhost:8010/proxy/better-prof/graphql',
  cache: new InMemoryCache()
});

const DialogBox: React.FC<DialogBoxProps> = ({ isOpen, onClose, group }) => {
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  const [searchQueryTerms, setSearchQueryTerms] = useState<string>('');
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]);
  const [allTerms, setAllTerms] = useState<string[]>([]);
  const [isTermsDropdownVisible, setIsTermsDropdownVisible] = useState<boolean>(false);

  const [isCourseDropdownVisible, setIsCourseDropdownVisible] = useState<boolean>(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [searchQueryCourses, setSearchQueryCourses] = useState<string>('');
  const [filteredCourses, setFilteredCourses] = useState<string[]>([]);
  const [allCourses, setAllCourses] = useState<string[]>([]);
  const [isCoursesDropdownVisible, setIsCoursesDropdownVisible] = useState<boolean>(false);

  const [isStudentIdDropdownVisible, setIsStudentIdDropdownVisible] = useState<boolean>(false);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [searchQueryStudentIds, setSearchQueryStudentIds] = useState<string>('');
  const [filteredStudentIds, setFilteredStudentIds] = useState<string[]>([]);
  const [allStudentIds, setAllStudentIds] = useState<string[]>([]);
  const [isStudentIdsDropdownVisible, setIsStudentIdsDropdownVisible] = useState<boolean>(false);

  const searchInputRefTerms = useRef<HTMLInputElement | null>(null);
  const searchInputRefCourses = useRef<HTMLInputElement | null>(null);
  const searchInputRefStudentIds = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [selectAllStudents, setSelectAllStudents] = useState<boolean>(false);
  const [isFirstOpen, setIsFirstOpen] = useState<boolean>(true);
  const [appliedSelections, setAppliedSelections] = useState<{terms: string[], courses: string[], studentIds: string[]}>({
    terms: [],
    courses: [],
    studentIds: []
  });

  const handleSelectAllStudents = () => {
    if (selectAllStudents) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(allStudentIds);
    }
    setSelectAllStudents(!selectAllStudents);
  };

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
      term.toLowerCase().includes(value.toLowerCase()) && !selectedTerms.includes(term)
    );
    setFilteredTerms(filtered);
  };

  const handleSearchChangeCourses = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQueryCourses(value);

    const filtered = allCourses.filter(course =>
      course.toLowerCase().includes(value.toLowerCase()) && !selectedCourses.includes(course)
    );
    setFilteredCourses(filtered);
  };

  const handleSearchChangeStudentIds = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQueryStudentIds(value);

    const filtered = allStudentIds.filter(studentId =>
      studentId.toLowerCase().includes(value.toLowerCase()) && !selectedStudentIds.includes(studentId)
    );
    setFilteredStudentIds(filtered);
  };

  const handleSearchResultClickTerms = (term: string) => {
    setSelectedTerms([...selectedTerms, term]);
    setSearchQueryTerms('');

    const filtered = allTerms.filter(opt => !selectedTerms.includes(opt) && opt.toLowerCase().includes(searchQueryTerms.toLowerCase()));
    setFilteredTerms(filtered);
    setIsTermsDropdownVisible(false);
  };

  const handleSearchResultClickCourses = (course: string) => {
    setSelectedCourses([...selectedCourses, course]);
    setSearchQueryCourses('');

    const filtered = allCourses.filter(opt => !selectedCourses.includes(opt) && opt.toLowerCase().includes(searchQueryCourses.toLowerCase()));
    setFilteredCourses(filtered);
    setIsCoursesDropdownVisible(false);
  };

  const handleSearchResultClickStudentIds = (studentId: string) => {
    setSelectedStudentIds([...selectedStudentIds, studentId]);
    setSearchQueryStudentIds('');
  
    const filtered = allStudentIds.filter(opt => !selectedStudentIds.includes(opt) && opt.toLowerCase().includes(searchQueryStudentIds.toLowerCase()));
    setFilteredStudentIds(filtered);
  };
  

  const handleClose = () => {
    setIsFirstOpen(false);
    setAppliedSelections({
      terms: selectedTerms,
      courses: selectedCourses,
      studentIds: selectedStudentIds
    });
    setTimeout(() => {
      onClose(selectedTerms, selectedCourses, selectedStudentIds, allStudentIds, group);
    }, 300);
  };

  const handleSearchFocusTerms = () => {
    setFilteredTerms(allTerms.filter(term => !selectedTerms.includes(term)));
    setIsTermsDropdownVisible(true);
  };

  const handleSearchFocusCourses = () => {
    setFilteredCourses(allCourses.filter(course => !selectedCourses.includes(course)));
    setIsCoursesDropdownVisible(true);
  };

  const handleSearchFocusStudentIds = () => {
    setFilteredStudentIds(allStudentIds.filter(studentId => !selectedStudentIds.includes(studentId)));
    setIsStudentIdsDropdownVisible(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      if (isFirstOpen) {
        setSelectedTerms([]);
        setSelectedCourses([]);
        setSelectedStudentIds([]);
      } else {
        setSelectedTerms(appliedSelections.terms);
        setSelectedCourses(appliedSelections.courses);
        setSelectedStudentIds(appliedSelections.studentIds);
      }
      setTimeout(() => {
        onClose(selectedTerms, selectedCourses, selectedStudentIds, allStudentIds, group);
      }, 300);
    }
  };

  const [getAvailableCourses, { loading: coursesLoading, error: coursesError, data: coursesData }] = useLazyQuery(GET_AVAILABLE_COURSES);
  const [getStudentIds, { loading: studentIdsLoading, error: studentIdsError, data: studentIdsData }] = useLazyQuery(GET_STUDENT_IDS);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFirstOpen, appliedSelections]);

  const { loading, error, data } = useQuery(GET_COHORT_TERMS, { skip: !isOpen });

  useEffect(() => {
    if (data && data.getAvailableTerms) {
      setAllTerms(data.getAvailableTerms);
      setFilteredTerms(data.getAvailableTerms.filter((term: string) => !selectedTerms.includes(term)));
    }
  }, [data, selectedTerms]);

  useEffect(() => {
    if (coursesData && coursesData.getAvailableCourses) {
      setAllCourses(coursesData.getAvailableCourses);
      setFilteredCourses(coursesData.getAvailableCourses.filter((course: string) => !selectedCourses.includes(course)));
    }
  }, [coursesData, selectedCourses]);

  useEffect(() => {
    if (studentIdsData && studentIdsData.getStudentIds) {
      setAllStudentIds(studentIdsData.getStudentIds);
      setFilteredStudentIds(studentIdsData.getStudentIds.filter((studentId: string) => !selectedStudentIds.includes(studentId)));
    }
  }, [studentIdsData, selectedStudentIds]);

  const handleShowCoursesDropdown = () => {
    getAvailableCourses({ variables: { terms: selectedTerms } });
    setIsCourseDropdownVisible(true);
  };

  const handleShowStudentIdsDropdown = () => {
    getStudentIds({ variables: { courses: selectedCourses, terms: selectedTerms } });
    setIsStudentIdDropdownVisible(true);
  };

  const handleReset = () => {
    setSelectedTerms([]);
    setSelectedCourses([]);
    setSelectedStudentIds([]);
    setSelectAllStudents(false);
    setSearchQueryTerms('');
    setSearchQueryCourses('');
    setSearchQueryStudentIds('');
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames="dialog"
      unmountOnExit
    >
      <div className="dialog-overlay">
        <div className="dialog" ref={dialogRef}>
          <div className="dialog-content">
            <div className="selected-options">
              <h3>Terms for Group {group}:</h3>
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
              <input
                type="text"
                id="searchTerm"
                placeholder="Search terms"
                value={searchQueryTerms}
                onChange={handleSearchChangeTerms}
                onFocus={handleSearchFocusTerms}
                ref={searchInputRefTerms}
              />
              {isTermsDropdownVisible && (
                <div className="search-results">
                  {filteredTerms.map((term, idx) => (
                    <div key={idx} className="search-result" onClick={() => handleSearchResultClickTerms(term)}>
                      {term}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {loading && <p className="loading">Loading terms...</p>}
            {error && <p className="error">Error loading terms</p>}

            <h3>Courses:</h3>
            <button className="plus-button" onClick={handleShowCoursesDropdown}>+</button>

            <CSSTransition
              in={isCourseDropdownVisible}
              timeout={600}
              classNames="course-container"
              unmountOnExit
            >
              <div className="course-container">
                <div className="selected-options">
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
                  <input
                    type="text"
                    id="searchCourse"
                    placeholder="Search courses"
                    value={searchQueryCourses}
                    onChange={handleSearchChangeCourses}
                    onFocus={handleSearchFocusCourses}
                    ref={searchInputRefCourses}
                  />
                  {isCoursesDropdownVisible && (
                    <div className="search-results">
                      {filteredCourses.map((course, idx) => (
                        <div key={idx} className="search-result" onClick={() => handleSearchResultClickCourses(course)}>
                          {course}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {coursesLoading && <p className="loading">Loading courses...</p>}
                {coursesError && <p className="error">Error loading courses</p>}

                <h3>Student IDs:</h3>
                <button className="plus-button" onClick={handleShowStudentIdsDropdown}>+</button>

                <CSSTransition
                  in={isStudentIdDropdownVisible}
                  timeout={600}
                  classNames="studentId-container"
                  unmountOnExit
                >
                  <div className="studentId-container">
                    <div className="selected-options">
                      <h3>
                        <input
                          type="checkbox"
                          checked={selectAllStudents}
                          onChange={handleSelectAllStudents}
                        />{' '}
                        Select all Student IDs
                      </h3>
                      <div className="options-container">
                        {selectedStudentIds.map((studentId, index) => (
                          <div key={index} className="selected-option">
                            <span className="option-text">{studentId}</span>
                            <span className="remove-option" 
                                onClick={() => handleRemoveStudentId(studentId)}>&#10006;</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="search-container">
                      <input
                        type="text"
                        id="searchStudentId"
                        placeholder="Search student IDs"
                        value={searchQueryStudentIds}
                        onChange={handleSearchChangeStudentIds}
                        onFocus={handleSearchFocusStudentIds}
                        ref={searchInputRefStudentIds}
                      />
                      {isStudentIdsDropdownVisible && (
                        <div className="search-results">
                          {filteredStudentIds.map((studentId, idx) => (
                            <div key={idx} className="search-result" onClick={() => handleSearchResultClickStudentIds(studentId)}>
                              {studentId}
                            </div>
                          ))}

                        </div>
                      )}
                    </div>
                    {studentIdsLoading && <p className="loading">Loading student IDs...</p>}
                    {studentIdsError && <p className="error">Error loading student IDs...</p>}
                  </div>
                </CSSTransition>
              </div>
            </CSSTransition>
          </div>
          <div className="button-container">
            <button className="close-button button-margin" onClick={handleClose}>Apply</button>
            <button className="reset-button button-margin" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

const DialogBoxWithApollo: React.FC<DialogBoxProps> = (props) => (
  <ApolloProvider client={client}>
    <DialogBox {...props} />
  </ApolloProvider>
);

export default DialogBoxWithApollo;
