package edu.uci.ics.betterprofbackend.model;

import lombok.Builder;

import java.util.List;
import java.util.Set;

@Builder
public record StudentFilterCriteria(
        Set<String> cohort,
        Set<GradeFlag> gradeFlag,
        Set<Boolean> isURG,
        Set<Boolean> isFirstGen,
        List<Float> mentalHealthRange
) {
}
