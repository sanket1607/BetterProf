package edu.uci.ics.betterprofbackend.transformer;

import edu.uci.ics.betterprofbackend.model.UnderRepresentedGroup;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class URGConvertor implements AttributeConverter<UnderRepresentedGroup, String> {
    @Override
    public String convertToDatabaseColumn(UnderRepresentedGroup underRepresentedGroup) {
        return underRepresentedGroup.getFlagValue();
    }

    @Override
    public UnderRepresentedGroup convertToEntityAttribute(String flagValue) {
        return UnderRepresentedGroup.fromFlagValue(flagValue);
    }
}
