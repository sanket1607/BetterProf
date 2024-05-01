package edu.uci.ics.betterprofbackend.dao;

import edu.uci.ics.betterprofbackend.model.Student;

import java.util.List;

public interface StudentDao {

    List<Student> getStudents();
}
