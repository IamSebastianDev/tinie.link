/** @format */

export const RangeService = () => {
    let _range: number[] = [];
    const getNewRangeFromZookeeper = async () => {
        // Implement the fetch to the Zookeeper here
        _range = Array(100000)
            .fill(null)
            .map((_, idx) => idx);
    };

    getNewRangeFromZookeeper();

    return {
        getNumber: async () => {
            if (_range.length === 0) {
                await getNewRangeFromZookeeper();
            }

            // To make the next url not to deterministic,
            // we calculate a random index to remove from the
            // range array, that will then be removed and returned
            const randomIdx = Math.floor(Math.random() * _range.length) * 1;
            const [accessed] = _range.splice(randomIdx);

            return accessed;
        },
    };
};
