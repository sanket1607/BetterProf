package edu.uci.ics.betterprofbackend.service;

import edu.uci.ics.betterprofbackend.dao.StudentDao;
import edu.uci.ics.betterprofbackend.model.NormalisedStudent;
import edu.uci.ics.betterprofbackend.model.Student;
import edu.uci.ics.betterprofbackend.statistics.NormalisedStudentMean;
import edu.uci.ics.betterprofbackend.transformer.StudentNormaliser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class StudentDataService {
    private final StudentDao studentDao;

    public List<String> getAvailableTerms() {
        return studentDao.getStudents()
                .stream()
                .map(Student::term)
                .distinct()
                .toList();
    }

    public List<String> getAvailableCourses(Set<String> terms) {
        return studentDao.getStudents()
                .stream()
                .filter(student -> terms.contains(student.term()))
                .map(Student::course)
                .distinct()
                .toList();
    }

    public List<String> getStudentIds(Set<String> terms, Set<String> courses) {
        return studentDao.getStudents()
                .stream()
                .filter(student ->
                        terms.contains(student.term())
                                && courses.contains(student.course())
                )
                .map(Student::course)
                .distinct()
                .toList();
    }

    public Optional<NormalisedStudent> getNormalisedStudentMean(Set<String> studentIds) {
        NormalisedStudentMean normalisedStudentMean = studentDao.getStudents()
                .stream()
                .filter(student -> studentIds.contains(student.id()))
                .map(StudentNormaliser::toNormalisedStudent)
                .collect(NormalisedStudentMean::new,
                        NormalisedStudentMean::accept,
                        NormalisedStudentMean::combine);
        return normalisedStudentMean.getMean();
    }
}
