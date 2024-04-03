/** @format */

import { createDirective, grain } from '@grainular/nord';

export const scrollTop = (classes: string) =>
    createDirective<Element>(
        (element) => {
            const top = grain(window.scrollY === 0);
            window.addEventListener('scroll', () => {
                top.set(window.scrollY === 0);
            });

            top.subscribe((top) => {
                if (top) {
                    element.classList.remove(...classes.split(' '));
                    return;
                }

                element.classList.add(...classes.split(' '));
            });
        },
        { nodeType: 'Element' },
    );
