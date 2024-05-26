package edu.uci.ics.betterprofbackend.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UnderRepresentedGroup {
    URG("URG", true),
    NonURG("Non-URG", false);

    private final String flagValue;
    private final boolean isURG;

    public static UnderRepresentedGroup fromFlagValue(String flagValue) {
        for (UnderRepresentedGroup underRepresentedGroup : UnderRepresentedGroup.values()) {
            if (underRepresentedGroup.flagValue.equals(flagValue)) {
                return underRepresentedGroup;
            }
        }
        throw new IllegalArgumentException();
    }
}
