package edu.uci.ics.betterprofbackend.statistics;

import edu.uci.ics.betterprofbackend.model.NormalisedStudent;
import lombok.Getter;

import java.util.Optional;
import java.util.function.Consumer;

@Getter
public class NormalisedStudentMean implements Consumer<NormalisedStudent> {
    private final NormalisedStudent total;
    private int count;

    public NormalisedStudentMean() {
        total = buildZeroStudent();
        count = 0;
    }

    @Override
    public void accept(NormalisedStudent normalisedStudent) {
        total.setGrade(total.getGrade() + normalisedStudent.getGrade());
        total.setGradeFlag(total.getGradeFlag() + normalisedStudent.getGradeFlag());
        total.setIsURG(total.getIsURG() + normalisedStudent.getIsURG());
        total.setIsFirstGen(total.getIsFirstGen() + normalisedStudent.getIsFirstGen());
        total.setMentalHealth(total.getMentalHealth() + normalisedStudent.getMentalHealth());
        total.setPassingSatisfaction(total.getPassingSatisfaction() + normalisedStudent.getPassingSatisfaction());
        total.setMathBackground(total.getMathBackground() + normalisedStudent.getMathBackground());
        total.setSenseOfBelonging(total.getSenseOfBelonging() + normalisedStudent.getSenseOfBelonging());
        total.setHasConsideredLeavingCS(total.getHasConsideredLeavingCS() + normalisedStudent.getHasConsideredLeavingCS());
        total.setCodingExperience(total.getCodingExperience() + normalisedStudent.getCodingExperience());
        total.setPassingConfidence(total.getPassingConfidence() + normalisedStudent.getPassingConfidence());
        total.setHasRoleModels(total.getHasRoleModels() + normalisedStudent.getHasRoleModels());
        total.setHangsOutWithCSClassmates(total.getHangsOutWithCSClassmates() + normalisedStudent.getHangsOutWithCSClassmates());

        count++;
    }

    public void combine(NormalisedStudentMean other) {
        total.setGrade(total.getGrade() + other.getTotal().getGrade());
        total.setGradeFlag(total.getGradeFlag() + other.getTotal().getGradeFlag());
        total.setIsURG(total.getIsURG() + other.getTotal().getIsURG());
        total.setIsFirstGen(total.getIsFirstGen() + other.getTotal().getIsFirstGen());
        total.setMentalHealth(total.getMentalHealth() + other.getTotal().getMentalHealth());
        total.setPassingSatisfaction(total.getPassingSatisfaction() + other.getTotal().getPassingSatisfaction());
        total.setMathBackground(total.getMathBackground() + other.getTotal().getMathBackground());
        total.setSenseOfBelonging(total.getSenseOfBelonging() + other.getTotal().getSenseOfBelonging());
        total.setHasConsideredLeavingCS(total.getHasConsideredLeavingCS() + other.getTotal().getHasConsideredLeavingCS());
        total.setCodingExperience(total.getCodingExperience() + other.getTotal().getCodingExperience());
        total.setPassingConfidence(total.getPassingConfidence() + other.getTotal().getPassingConfidence());
        total.setHasRoleModels(total.getHasRoleModels() + other.getTotal().getHasRoleModels());
        total.setHangsOutWithCSClassmates(total.getHangsOutWithCSClassmates() + other.getTotal().getHangsOutWithCSClassmates());

        count += other.getCount();
    }


    private static NormalisedStudent buildZeroStudent() {
        final NormalisedStudent zero;
        zero = new NormalisedStudent(
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
        );
        return zero;
    }

    public Optional<NormalisedStudent> getMean() {
        if (count == 0) {
            return Optional.empty();
        }
        NormalisedStudent mean = NormalisedStudent.builder()
                .grade(total.getGrade() / count)
                .gradeFlag(total.getGradeFlag() / count)
                .isURG(total.getIsURG() / count)
                .isFirstGen(total.getIsFirstGen() / count)
                .mentalHealth(total.getMentalHealth() / count)
                .passingSatisfaction(total.getPassingSatisfaction() / count)
                .mathBackground(total.getMathBackground() / count)
                .senseOfBelonging(total.getSenseOfBelonging() / count)
                .hasConsideredLeavingCS(total.getHasConsideredLeavingCS() / count)
                .codingExperience(total.getCodingExperience() / count)
                .passingConfidence(total.getPassingConfidence() / count)
                .hasRoleModels(total.getHasRoleModels() / count)
                .hangsOutWithCSClassmates(total.getHangsOutWithCSClassmates() / count)
                .build();
        return Optional.of(mean);
    }
}
