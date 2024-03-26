/** @format */

import base62 from 'base62';

export const Base62Service = () => {
    return {
        convert: (range_entry: number) => {
            return base62.encode(range_entry);
        },
    };
};
