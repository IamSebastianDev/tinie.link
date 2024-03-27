/** @format */

import base62 from 'base62';

/**
 * Service to handle `Base62` conversions.
 */
export const Base62Service = () => {
    return {
        convert: (range_entry: number) => {
            return base62.encode(range_entry);
        },
    };
};
