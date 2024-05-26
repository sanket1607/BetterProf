package edu.uci.ics.betterprofbackend.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GradeFlag {
    BMA("BM_"), CPB("CP_");

    private final String value;

    public static GradeFlag fromString(String value) {
        for (GradeFlag gradeFlag : GradeFlag.values()) {
            if (gradeFlag.value.equalsIgnoreCase(value)) {
                return gradeFlag;
            }
        }
        throw new IllegalArgumentException();
    }

    public GradeFlag fromGrade(Grade grade) {
        return switch (grade) {
            case A_Plus, A, A_Minus, B_Plus, B, B_Minus -> GradeFlag.BMA;
            case C_Plus, C, C_Minus, D_Plus, D, D_Minus, DROPPED -> GradeFlag.CPB;
        };
    }
}
