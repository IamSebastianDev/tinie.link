/** @format */

import { createComponent, on } from '@grainular/nord';
import { ButtonProps } from './button.props';
import { classes as c } from '../../../scripts/classes';
import { disabled } from '../../../directives/disabled.directive';

export const Button = createComponent<ButtonProps>(
    (html, { label, onClick, classes, type, $children, disabled: d = false }) => {
        return html`<button
            ${disabled(d)}
            type="${type ?? 'button'}"
            class="${c('group duration-200 flex flex-row gap-2 justify-center items-center', classes)}"
            ${on<PointerEvent>('click', (ev) => onClick?.(ev))}
        >
            ${$children} ${label}
        </button>`;
    },
);
