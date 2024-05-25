package edu.uci.ics.betterprofbackend.model;
import lombok.Data;
import org.springframework.stereotype.Component;
import jakarta.persistence.*;

@Entity
@Data
@Component
@Table(name = "students")
public class Student {

    @Column(name = "term")
    private String term;

    @Column(name = "course")
    private String course;

    @Id
    @Column(name = "student_id")
    private String studentId;

    @Column(name = "grades")
    Grade grade;

    @Column(name = "grades_flag")
    private GradeFlag gradesFlag;

    @Column(name = "gender")
    private String gender;

    @Column(name = "urg_flag")
    private boolean isURG;

    @Column(name = "first_gen")
    private boolean isFirstGen;

    @Column(name = "mental_health")
    private int mentalHealth;

    @Column(name = "passing_satisfaction")
    private int passingSatisfaction;

    @Column(name = "math_background")
    private int mathBackground;

    @Column(name = "sense_of_belonging")
    private int senseOfBelonging;

    @Column(name = "leaving_cs")
    private int hasConsideredLeavingCS;

    @Column(name = "coding_experience")
    private int codingExperience;

    @Column(name = "passing_confidence")
    private int passingConfidence;

    @Column(name = "role_models")
    private int hasRoleModels;

    @Column(name = "cs_classmates")
    private int hangsOutWithCSClassmates;
}
