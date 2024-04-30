package edu.uci.ics.betterprofbackend.service;

import edu.uci.ics.betterprofbackend.dao.StudentDao;
import edu.uci.ics.betterprofbackend.model.NormalisedStudent;
import edu.uci.ics.betterprofbackend.model.Student;
import edu.uci.ics.betterprofbackend.model.StudentFilterCriteria;
import edu.uci.ics.betterprofbackend.statistics.NormalisedStudentMean;
import edu.uci.ics.betterprofbackend.transformer.StudentNormaliser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentDataService {
    private final StudentDao studentDao;
    private final StudentFilter studentFilter;

    public List<String> getAvailableCohortTerms() {
        return studentDao.getStudents()
                .stream()
                .map(Student::term)
                .distinct()
                .toList();
    }

    public Optional<NormalisedStudent> getNormalisedStudentMean(StudentFilterCriteria studentFilterCriteria) {
        NormalisedStudentMean normalisedStudentMean = studentDao.getStudents()
                .stream()
                .filter(student -> studentFilter.test(student, studentFilterCriteria))
                .map(StudentNormaliser::toNormalisedStudent)
                .collect(NormalisedStudentMean::new,
                        NormalisedStudentMean::accept,
                        NormalisedStudentMean::combine);
        return normalisedStudentMean.getMean();
    }

}
