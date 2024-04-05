/** @format */

import { createComponent } from '@grainular/nord';
import { LinkProps } from './link.props';
import { classes as c } from '../../../scripts/classes';

export const Link = createComponent<LinkProps>(
    (html, { label, href, disabled, $children, classes, target = '_self' }) => {
        return html`<a
            rel="no-referrer no-opener"
            href="${href}"
            class="${c(
                'text-zinc-300 text-sm hover:text-amber-600 font-semibold hover:underline underline-offset-4 inline-flex flex-row items-center gap-2',
                classes,
            )}"
            target="${target}"
            ${disabled ? 'disabled' : undefined}
        >
            ${$children} ${label}
        </a>`;
    },
);
