package edu.uci.ics.betterprofbackend.statistics;

import edu.uci.ics.betterprofbackend.model.Grade;
import edu.uci.ics.betterprofbackend.model.GradeFlag;
import edu.uci.ics.betterprofbackend.statistics.scale.BetterProfChartScale;
import edu.uci.ics.betterprofbackend.statistics.scale.LikertScale;

import static edu.uci.ics.betterprofbackend.statistics.scale.BetterProfChartScale.RANGE_MAX;
import static edu.uci.ics.betterprofbackend.statistics.scale.BetterProfChartScale.RANGE_MIN;

public class BetterProfChartScaleNormaliser {

    public static float normaliseFromLikertScale(GradeFlag gradeFlag) {
        return switch (gradeFlag) {
            case BMA -> BetterProfChartScale.RANGE_MAX;
            case CPB -> BetterProfChartScale.RANGE_MIN;
        };
    }

    public static float normaliseFromLikertScale(Grade grade) {
        final float RANGE = RANGE_MAX - RANGE_MIN;
        final float NUM_GRADES_IN_RANGE = 11;
        final float GRADE_WIDTH = RANGE / NUM_GRADES_IN_RANGE;

        return switch (grade) {
            case A_Plus -> RANGE_MAX - 0 * GRADE_WIDTH;
            case A -> RANGE_MAX - 1 * GRADE_WIDTH;
            case A_Minus -> RANGE_MAX - 2 * GRADE_WIDTH;
            case B_Plus -> RANGE_MAX - 3 * GRADE_WIDTH;
            case B -> RANGE_MAX - 4 * GRADE_WIDTH;
            case B_Minus -> RANGE_MAX - 5 * GRADE_WIDTH;
            case C_Plus -> RANGE_MAX - 6 * GRADE_WIDTH;
            case C -> RANGE_MAX - 7 * GRADE_WIDTH;
            case C_Minus -> RANGE_MAX - 8 * GRADE_WIDTH;
            case D_Plus -> RANGE_MAX - 9 * GRADE_WIDTH;
            case D -> RANGE_MAX - 10 * GRADE_WIDTH;
            case D_Minus -> RANGE_MAX - 11 * GRADE_WIDTH;
            case DROPPED -> RANGE_MIN;
        };
    }

    public static float normaliseFromLikertScale(int value) {
        final float valueAsPercentage = (float) value
                / LikertScale.SCALE_RANGE;
        return BetterProfChartScale.RANGE_MIN
                + valueAsPercentage * BetterProfChartScale.SCALE_RANGE;
    }

    public static float normaliseBoolean(int value) {
        return switch (value) {
            case 0 -> RANGE_MAX;
            case 1 -> RANGE_MIN;
            default -> throw new IllegalStateException("Unexpected value for boolean: " + value);
        };
    }

    public static float normaliseBoolean(boolean value) {
        if (value) {
            return RANGE_MAX;
        } else {
            return RANGE_MIN;
        }
    }
}
