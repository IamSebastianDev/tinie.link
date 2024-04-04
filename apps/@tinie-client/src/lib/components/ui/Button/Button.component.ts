/** @format */

import { createComponent, on } from '@grainular/nord';
import { ButtonProps } from './Button.props';

export const Button = createComponent<ButtonProps>((html, { label, onClick }) => {
    return html`<button ${on<PointerEvent>('click', (ev) => onClick(ev))}>${label}</button>`;
});
