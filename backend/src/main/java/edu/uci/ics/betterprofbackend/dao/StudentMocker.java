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
                "ICS32",
                "f23_001",
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
                "ICS32",
                "w23_004",
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
                1,
                1));

        mockStudents.add(new Student("w24",
                "ICS32A",
                "w24_012",
                Grade.B,
                GradeFlag.BMA,
                false,
                true,
                3,
                2,
                4,
                2,
                3,
                2,
                3,
                0,
                1));

        mockStudents.add(new Student("w23",
                "ICS32",
                "w23_003",
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
                1,
                1));

        mockStudents.add(new Student("w23",
                "ICS32",
                "w23_044",
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
                0,
                1));

        return mockStudents;
    }
}
