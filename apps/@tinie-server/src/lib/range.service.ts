/** @format */

import { requestNewRange } from '@tinie/range';
import { InternalServerError } from 'elysia';

export const RangeService = () => {
    let _range: number[] = [];

    const getNewRangeFromZookeeper = async () => {
        // Implement the fetch to the Zookeeper here
        const range = await requestNewRange();

        if (!range) {
            throw new InternalServerError(`Range could not be allocated.`);
        }

        _range = range;
    };

    getNewRangeFromZookeeper();

    return {
        getNumber: async () => {
            if (_range.length === 0) {
                await getNewRangeFromZookeeper();
            }

            // To make the next url not too deterministic,
            // we calculate a random index to remove from the
            // range array, that will then be removed and returned
            const randomIdx = Math.floor(Math.random() * _range.length) * 1;
            const [accessed] = _range.splice(randomIdx);

            return accessed;
        },
    };
};
