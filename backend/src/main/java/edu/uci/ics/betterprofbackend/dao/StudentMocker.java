package edu.uci.ics.betterprofbackend.dao;

import edu.uci.ics.betterprofbackend.model.Grade;
import edu.uci.ics.betterprofbackend.model.GradeFlag;
import edu.uci.ics.betterprofbackend.model.Student;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StudentMocker implements StudentDao {

    @Override
    public List<Student> getStudents() {
        return buildMockStudents();
    }

    private List<Student> buildMockStudents() {
        List<Student> mockStudents = new ArrayList<>();

        mockStudents.add(new Student("f23",
                Grade.A,
                GradeFlag.BMA,
                true,
                true,
                4,
                5,
                3,
                4,
                2,
                5,
                2,
                1,
                1));

        mockStudents.add(new Student("w23",
                Grade.C_Minus,
                GradeFlag.CPB,
                false,
                false,
                5,
                5,
                3,
                5,
                5,
                2,
                3,
                5,
                1));

        return mockStudents;
    }
}
