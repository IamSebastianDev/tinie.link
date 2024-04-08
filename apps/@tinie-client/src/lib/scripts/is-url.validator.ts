/** @format */

import { ControlError } from '@grainular/nord-forms';

export const isUrl = (value: string | null): ControlError | null => {
    if (!value) {
        return { required: true };
    }

    // A simple regex for URL validation that checks for protocol, domain, and optional parts
    // This regex is not exhaustive but provides a good balance for common URLs
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?\S*)?$/;

    if (!urlPattern.test(value)) {
        return { url: true };
    }

    return null;
};
