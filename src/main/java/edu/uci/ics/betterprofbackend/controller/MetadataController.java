package edu.uci.ics.betterprofbackend.controller;

import edu.uci.ics.betterprofbackend.service.StudentDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MetadataController {
    private final StudentDataService studentDataService;

    @QueryMapping
    public List<String> getAvailableCohortTerms() {
        return studentDataService.getAvailableCohortTerms();
    }
}
