package edu.uci.ics.betterprofbackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@AllArgsConstructor
@Getter
@Setter
public class NormalisedStudent {
    private final String term;
    private float grade;
    private float gradeFlag;
    private float isURG;
    private float isFirstGen;
    private float mentalHealth;
    private float passingSatisfaction;
    private float mathBackground;
    private float senseOfBelonging;
    private float hasConsideredLeavingCS;
    private float codingExperience;
    private float passingConfidence;
    private float hasRoleModels;
    private float hangsOutWithCSClassmates;
}
