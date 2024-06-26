package edu.uci.ics.betterprofbackend.controller;

import edu.uci.ics.betterprofbackend.model.NormalisedStudent;
import edu.uci.ics.betterprofbackend.service.StudentDataService;
import edu.uci.ics.betterprofbackend.util.InputSanitizer;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin()
@RestController
@RequiredArgsConstructor
public class StudentDataController {
    private final StudentDataService studentDataService;

    @QueryMapping
    public NormalisedStudent getNormalisedStudentMean(
            @Argument List<String> studentIds) {
        Optional<NormalisedStudent> normalisedStudent = studentDataService.getNormalisedStudentMean(studentIds);
        return normalisedStudent
                .orElse(null);
    }
}
