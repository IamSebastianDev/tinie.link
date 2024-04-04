/** @format */

import { createDirective } from '@grainular/nord';
import { listEmpty } from '../grains/list-empty.grain';

export const shrinkHero = (classes: string) =>
    createDirective<Element>(
        (element) => {
            listEmpty.subscribe((state) => {
                if (!state) {
                    element.classList.remove(...classes.split(' '));
                    return;
                }

                element.classList.add(...classes.split(' '));
            });
        },
        { nodeType: 'Element' },
    );
