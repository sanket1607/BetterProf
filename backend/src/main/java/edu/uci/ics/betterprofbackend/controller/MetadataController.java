package edu.uci.ics.betterprofbackend.controller;

import edu.uci.ics.betterprofbackend.service.StudentDataService;
import edu.uci.ics.betterprofbackend.util.InputSanitizer;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@CrossOrigin()
@RestController
@RequiredArgsConstructor
public class MetadataController {
    private final StudentDataService studentDataService;

    @QueryMapping
    public List<String> getAvailableTerms() {
        return studentDataService.getAvailableTerms();
    }

    @QueryMapping
    public List<String> getAvailableCourses(
            @Argument List<String> terms
    ) {
        return studentDataService.getAvailableCourses(terms);
    }

    @QueryMapping
    public List<String> getStudentIds(
            @Argument List<String> terms,
            @Argument List<String> courses
    ) {
        return studentDataService.getStudentIds(terms, courses);
    }
}
