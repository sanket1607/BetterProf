package edu.uci.ics.betterprofbackend.service;

import edu.uci.ics.betterprofbackend.dao.StudentDao;
import edu.uci.ics.betterprofbackend.model.NormalisedStudent;
import edu.uci.ics.betterprofbackend.model.Student;
import edu.uci.ics.betterprofbackend.repositories.StudentRepository;
import edu.uci.ics.betterprofbackend.statistics.NormalisedStudentMean;
import edu.uci.ics.betterprofbackend.transformer.StudentNormaliser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentDataService {
    private final StudentRepository studentRepository;

    public List<String> getAvailableTerms() {
        return studentRepository.findDistinctTerm()
                .stream()
                .toList();
    }

    public List<String> getAvailableCourses(List<String> terms) {
        return studentRepository.findDistinctCourseByTermIn(terms)
                .stream()
                .toList();
    }

    public List<String> getStudentIds(List<String> terms, List<String> courses) {
        return studentRepository.findDistinctStudentIdByTermInAndCourseIn(terms, courses)
                .stream()
                .toList();
    }

    public Optional<NormalisedStudent> getNormalisedStudentMean(List<String> studentIds) {

        NormalisedStudentMean normalisedStudentMean = studentRepository.findAllByStudentIdIn(studentIds)
                .stream()
                .map(StudentNormaliser::toNormalisedStudent)
                .collect(NormalisedStudentMean::new,
                        NormalisedStudentMean::accept,
                        NormalisedStudentMean::combine);
        return normalisedStudentMean.getMean();
    }
}
