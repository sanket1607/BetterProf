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