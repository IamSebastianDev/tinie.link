/** @format */

import { ReadonlyGrain, createDirective } from '@grainular/nord';

export const shrinkHero = (classes: string, grain: ReadonlyGrain<boolean>) =>
    createDirective<Element>(
        (element) => {
            grain.subscribe((state) => {
                if (!state) {
                    element.classList.remove(...classes.split(' '));
                    return;
                }

                element.classList.add(...classes.split(' '));
            });
        },
        { nodeType: 'Element' },
    );
