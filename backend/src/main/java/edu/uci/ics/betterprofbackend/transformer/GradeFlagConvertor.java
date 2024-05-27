package edu.uci.ics.betterprofbackend.transformer;

import edu.uci.ics.betterprofbackend.model.GradeFlag;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class GradeFlagConvertor implements AttributeConverter<GradeFlag, String> {

    @Override
    public String convertToDatabaseColumn(GradeFlag gradeFlag) {
        return gradeFlag.getFlagValue();
    }

    @Override
    public GradeFlag convertToEntityAttribute(String value) {
        return GradeFlag.fromString(value);
    }
}
