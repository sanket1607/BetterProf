package edu.uci.ics.betterprofbackend.model;

import lombok.Builder;

import java.util.List;
import java.util.Set;

@Builder
public record StudentFilterCriteria(
        Set<String> cohorts,
        Set<String> terms,
        Set<GradeFlag> gradeFlags,
        Set<Boolean> isURG,
        Set<Boolean> isFirstGen,
        List<Float> mentalHealthRange
) {
}
