CREATE TABLE IF NOT EXISTS students (
    term VARCHAR(8),
    course VARCHAR(50),
    student_id VARCHAR(80),
    grades VARCHAR(4),
    grades_flag VARCHAR(3),
    gender VARCHAR(6),
    urg_flag VARCHAR(7),
    first_gen BOOLEAN,
    mental_health INT,
    passing_satisfaction INT,
    math_background INT,
    sense_of_belonging INT,
    leaving_cs INT,
    coding_experience INT,
    passing_confidence INT,
    role_models BOOLEAN,
    cs_classmates BOOLEAN
);