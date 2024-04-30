package edu.uci.ics.betterprofbackend.service;

import edu.uci.ics.betterprofbackend.model.Student;
import edu.uci.ics.betterprofbackend.model.StudentFilterCriteria;
import org.springframework.stereotype.Component;

import java.util.function.BiPredicate;

@Component
public class StudentFilter implements BiPredicate<Student, StudentFilterCriteria> {
    public boolean test(Student student,
                        StudentFilterCriteria studentFilterCriteria) {
        boolean accept;
        accept = studentFilterCriteria.cohort().contains(student.term());
        accept = accept && studentFilterCriteria.gradeFlag().contains(student.gradeFlag());
        accept = accept && studentFilterCriteria.isURG().contains(student.isURG());
        accept = accept && studentFilterCriteria.isFirstGen().contains(student.isFirstGen());
        accept = accept && isMentalHealthInRange(studentFilterCriteria, student);
        return accept;
    }

    private boolean isMentalHealthInRange(StudentFilterCriteria studentFilterCriteria, Student student) {
        final int studentMentalHealth = student.mentalHealth();
        return studentFilterCriteria.mentalHealthRange().get(0) <= studentMentalHealth
                && studentFilterCriteria.mentalHealthRange().get(1) >= studentMentalHealth;
    }
}
