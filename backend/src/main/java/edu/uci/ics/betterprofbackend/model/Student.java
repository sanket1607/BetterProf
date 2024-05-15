package edu.uci.ics.betterprofbackend.model;

public record Student(
        String term,
        String course,
        String id,
        Grade grade,
        GradeFlag gradeFlag,
        boolean isURG,
        boolean isFirstGen,
        int mentalHealth,
        int passingSatisfaction,
        int mathBackground,
        int senseOfBelonging,
        int hasConsideredLeavingCS,
        int codingExperience,
        int passingConfidence,
        int hasRoleModels,
        int hangsOutWithCSClassmates) {
}
