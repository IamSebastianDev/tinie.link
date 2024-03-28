/** @format */

import { handleAsync } from '@iasd/handle-async';
import { client } from '../client';

const base62Offset = Math.pow(62, 6);
const rangeSize = 100000;

export const requestNewRange = async (): Promise<number[] | null> => {
    return handleAsync(
        async () => {
            // The client returns the rangeAllocationId, that is
            // then used to compute the range start and end.
            const rangeAllocationId = await client.getRange();

            if (rangeAllocationId === null) {
                return rangeAllocationId;
            }

            const rangeStart = (rangeAllocationId - 1) * rangeSize + base62Offset;
            const range: number[] = Array.from({ length: rangeSize }, (e, i) => i + rangeStart);

            return range;
        },
        {
            Ok: (range) => range,
            Err: () => null,
        },
    );
};
