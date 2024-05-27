package edu.uci.ics.betterprofbackend.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Grade {
    A_Plus("A+"),
    A("A"),
    A_Minus("A-"),
    B_Plus("B+"),
    B("B"),
    B_Minus("B-"),
    C_Plus("C+"),
    C("C"),
    C_Minus("C-"),
    D_Plus("D+"),
    D("D"),
    D_Minus("D-"),
    DROPPED("");

    private final String letter;

    public static Grade fromString(String letter) {
        for (Grade grade : Grade.values()) {
            if (grade.getLetter().equals(letter)) {
                return grade;
            }
        }
        return DROPPED;

//        throw new IllegalArgumentException(letter + " is not a valid grade");
    }
}
