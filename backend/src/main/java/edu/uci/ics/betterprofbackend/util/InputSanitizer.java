package edu.uci.ics.betterprofbackend.util;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class InputSanitizer {
    public static List<String> sanitize(Collection<String> inputs) {
        return inputs.stream()
                .map(InputSanitizer::sanitize)
                .collect(Collectors.toList());
    }

    public static String sanitize(String input) {
        return input.toLowerCase();
    }
}
