import { gql } from '@apollo/client';

export const GET_NORMALISED_STUDENT_MEAN = gql`
  query GetNormalisedStudentMean($studentIds: [String!]!) {
    getNormalisedStudentMean(studentIds: $studentIds) {
        codingExperience
        grade
        gradeFlag
        hangsOutWithCSClassmates
        hasConsideredLeavingCS
        hasRoleModels
        isFirstGen
        isURG
        mathBackground
        mentalHealth
        passingConfidence
        passingSatisfaction
        senseOfBelonging
    }
  }
`;

export const GET_COHORT_TERMS = gql`
  query {
    getAvailableTerms
  }
`;

export const GET_AVAILABLE_COURSES = gql`
  query GetAvailableCourses($terms: [String!]) {
    getAvailableCourses(terms: $terms)
  }
`;

export const GET_STUDENT_IDS = gql`
  query GetStudentIds($courses: [String!], $terms: [String!]) {
    getStudentIds(courses: $courses, terms: $terms)
  }
`;
