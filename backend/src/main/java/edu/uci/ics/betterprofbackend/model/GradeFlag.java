package edu.uci.ics.betterprofbackend.model;

public enum GradeFlag {
    BMA("BMA"), CPB("CPB");

    private String value;
    GradeFlag(String value) {
        this.value = value;
    }

    public GradeFlag fromGrade(Grade grade) {
        return switch (grade) {
            case A_Plus, A, A_Minus, B_Plus, B, B_Minus -> GradeFlag.BMA;
            case C_Plus, C, C_Minus, D_Plus, D, D_Minus, DROPPED -> GradeFlag.CPB;
        };
    }
}
