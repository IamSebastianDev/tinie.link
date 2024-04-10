/** @format */

export const classNames = (...fragments: (string | string[] | null | undefined)[]) => [...fragments].flat().join(' ');
