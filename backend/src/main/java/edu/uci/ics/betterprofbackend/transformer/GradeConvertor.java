package edu.uci.ics.betterprofbackend.transformer;

import edu.uci.ics.betterprofbackend.model.Grade;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class GradeConvertor implements AttributeConverter<Grade, String> {
    @Override
    public String convertToDatabaseColumn(Grade grade) {
        return grade.getLetter();
    }

    @Override
    public Grade convertToEntityAttribute(String letter) {
        return Grade.fromString(letter);
    }
}
