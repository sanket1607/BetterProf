package edu.uci.ics.betterprofbackend.controller;

import edu.uci.ics.betterprofbackend.model.GradeFlag;
import edu.uci.ics.betterprofbackend.model.NormalisedStudent;
import edu.uci.ics.betterprofbackend.model.StudentFilterCriteria;
import edu.uci.ics.betterprofbackend.service.StudentDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class StudentDataController {
    private final StudentDataService studentDataService;

    @QueryMapping
    public NormalisedStudent getNormalisedStudentMean(
            @Argument Set<String> cohort,
            @Argument Set<GradeFlag> gradeFlag,
            @Argument Set<Boolean> isURG,
            @Argument Set<Boolean> isFirstGen,
            @Argument List<Float> mentalHealthRange) {

        StudentFilterCriteria studentFilterCriteria = buildStudentFilter(
                cohort,
                gradeFlag,
                isURG,
                isFirstGen,
                mentalHealthRange);
        Optional<NormalisedStudent> normalisedStudent = studentDataService.getNormalisedStudentMean(studentFilterCriteria);
        return normalisedStudent
                .orElse(null);
    }

    private StudentFilterCriteria buildStudentFilter(Set<String> cohort,
                                                     Set<GradeFlag> gradeFlag,
                                                     Set<Boolean> isURG,
                                                     Set<Boolean> isFirstGen,
                                                     List<Float> mentalHealthRange) {
        return StudentFilterCriteria.builder()
                .cohort(cohort)
                .gradeFlag(gradeFlag)
                .isURG(isURG)
                .isFirstGen(isFirstGen)
                .mentalHealthRange(mentalHealthRange)
                .build();
    }
}
