package edu.uci.ics.betterprofbackend.repositories;
import edu.uci.ics.betterprofbackend.model.Student;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;


@Repository
public interface StudentRepository extends CrudRepository<Student, Long> {
    @Query("SELECT DISTINCT s.term FROM Student s")
    List<String> findDistinctTerm();

    @Query("SELECT DISTINCT s.course FROM Student s WHERE s.term IN (:terms)")
    List<String> findDistinctCourseByTermIn(@Param("terms") List<String> terms);

    @Query("SELECT DISTINCT s.studentId FROM Student s WHERE s.term IN (:terms) and s.course IN (:courses) ORDER BY s.studentId")
    List<String> findDistinctStudentIdByTermInAndCourseIn(@Param("terms") List<String> terms, @Param("courses") List<String> courses);

    @Query("SELECT s FROM Student s WHERE s.studentId IN (:studentIds)")
    List<Student> findAllByStudentIdIn(@Param("studentIds") List<String> studentIds);
}

