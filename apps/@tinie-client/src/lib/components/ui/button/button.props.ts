/** @format */

import { ReadonlyGrain } from '@grainular/nord';

export type ButtonProps = {
    label?: string;
    onClick?: (ev: PointerEvent) => void;
    classes?: string | string[];
    type?: 'button' | 'submit';
    disabled?: ReadonlyGrain<boolean>;
};
