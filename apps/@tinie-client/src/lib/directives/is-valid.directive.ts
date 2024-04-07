/** @format */

import { ReadonlyGrain, createDirective } from '@grainular/nord';

export const isValid = (input: ReadonlyGrain<boolean>) =>
    createDirective(
        (node: Element) => {
            const setState = (state: boolean) => {
                if (state) {
                    node.setAttribute('data-is-valid', 'true');
                    return;
                }

                node.setAttribute('data-is-valid', 'false');
            };

            input.subscribe((state) => setState(state));
        },
        { nodeType: 'Element' },
    );
