/** @format */

export type ButtonProps = {
    label?: string;
    onClick?: (ev: PointerEvent) => void;
    classes?: string | string[];
    type?: 'button' | 'submit';
};
