/** @format */

import { createDirective } from '@grainular/nord';

export const clickOutside = (handler: () => void) =>
    createDirective(
        (node: Element) => {
            window.addEventListener('click', (ev) => {
                const target = ev.target as Element;
                if (!node.contains(target)) {
                    return handler();
                }
            });
        },
        { nodeType: 'Element' },
    );
