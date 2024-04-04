/** @format */

import { createComponent, on } from '@grainular/nord';
import { ButtonProps } from './button.props';
import { classes as c } from '../../../scripts/classes';

export const Button = createComponent<ButtonProps>((html, { label, onClick, classes, type, $children }) => {
    return html`<button
        type="${type ?? 'button'}"
        class="${c('group duration-200 flex flex-row-reverse gap-2 justify-center items-center', classes)}"
        ${on<PointerEvent>('click', (ev) => onClick?.(ev))}
    >
        ${label} ${$children}
    </button>`;
});
