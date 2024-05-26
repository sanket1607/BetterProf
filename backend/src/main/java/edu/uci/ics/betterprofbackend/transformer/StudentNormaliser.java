package edu.uci.ics.betterprofbackend.transformer;

import edu.uci.ics.betterprofbackend.model.NormalisedStudent;
import edu.uci.ics.betterprofbackend.model.Student;
import edu.uci.ics.betterprofbackend.statistics.BetterProfChartScaleNormaliser;

public class StudentNormaliser {

    public static NormalisedStudent toNormalisedStudent(Student student) {
        return NormalisedStudent.builder()
                .grade(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.getGrade())
                )
                .gradeFlag(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.getGradesFlag())
                )
                .isURG(
                        BetterProfChartScaleNormaliser.normaliseBoolean(student.getIsURG().isURG())
                )
                .isFirstGen(
                        BetterProfChartScaleNormaliser.normaliseBoolean(student.isFirstGen())
                )
                .mentalHealth(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.getMentalHealth())
                )
                .passingSatisfaction(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.getPassingSatisfaction())
                )
                .mathBackground(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.getMathBackground())
                )
                .senseOfBelonging(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.getSenseOfBelonging())
                )
                .hasConsideredLeavingCS(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.getHasConsideredLeavingCS())
                )
                .codingExperience(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.getCodingExperience())
                )
                .passingConfidence(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.getPassingConfidence())
                )
                .hasRoleModels(
                        BetterProfChartScaleNormaliser.normaliseBoolean(student.isHasRoleModels())
                )
                .hangsOutWithCSClassmates(
                        BetterProfChartScaleNormaliser.normaliseBoolean(student.isHangsOutWithCSClassmates())
                )
                .build();
    }
}
