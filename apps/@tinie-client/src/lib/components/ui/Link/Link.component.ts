/** @format */

import { createComponent } from '@grainular/nord';
import { LinkProps } from './Link.props';
import { classes as c } from '../../../scripts/classes';

export const Link = createComponent<LinkProps>((html, { label, href, disabled, $children, classes }) => {
    return html`<a
        class="${c(
            'text-zinc-300 text-sm hover:text-zinc-100 font-semibold hover:underline underline-offset-4 flex flex-row-reverse items-center gap-2',
            classes,
        )}"
        href="${href}"
        ${disabled ? 'disabled' : undefined}
    >
        ${label} ${$children}
    </a>`;
});
