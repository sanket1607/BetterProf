package edu.uci.ics.betterprofbackend.util;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class InputSanitizer {
    public static Set<String> sanitize(Collection<String> inputs) {
        return inputs.stream()
                .map(InputSanitizer::sanitize)
                .collect(Collectors.toSet());
    }

    public static String sanitize(String input) {
        return input.toLowerCase();
    }
}
