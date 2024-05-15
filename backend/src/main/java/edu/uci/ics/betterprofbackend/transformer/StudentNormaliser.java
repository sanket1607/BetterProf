package edu.uci.ics.betterprofbackend.transformer;

import edu.uci.ics.betterprofbackend.model.NormalisedStudent;
import edu.uci.ics.betterprofbackend.model.Student;
import edu.uci.ics.betterprofbackend.statistics.BetterProfChartScaleNormaliser;

public class StudentNormaliser {

    public static NormalisedStudent toNormalisedStudent(Student student) {
        return NormalisedStudent.builder()
                .grade(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.grade())
                )
                .gradeFlag(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.gradeFlag())
                )
                .isURG(
                        BetterProfChartScaleNormaliser.normaliseBoolean(student.isURG())
                )
                .isFirstGen(
                        BetterProfChartScaleNormaliser.normaliseBoolean(student.isFirstGen())
                )
                .mentalHealth(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.mentalHealth())
                )
                .passingSatisfaction(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.passingSatisfaction())
                )
                .mathBackground(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.mathBackground())
                )
                .senseOfBelonging(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.senseOfBelonging())
                )
                .hasConsideredLeavingCS(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.hasConsideredLeavingCS())
                )
                .codingExperience(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.codingExperience())
                )
                .passingConfidence(
                        BetterProfChartScaleNormaliser.normaliseFromLikertScale(student.passingConfidence())
                )
                .hasRoleModels(
                        BetterProfChartScaleNormaliser.normaliseBoolean(student.hasRoleModels())
                )
                .hangsOutWithCSClassmates(
                        BetterProfChartScaleNormaliser.normaliseBoolean(student.hangsOutWithCSClassmates())
                )
                .build();
    }
}
