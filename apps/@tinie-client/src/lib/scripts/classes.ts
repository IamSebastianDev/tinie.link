/** @format */

export const classes = (...segments: (string | string[] | null | undefined)[]) => {
    return segments
        .flat()
        .filter((elem) => !!elem)
        .join(' ');
};
