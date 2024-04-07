/** @format */

import { ReadonlyGrain, createDirective } from '@grainular/nord';

export const disabled = (input: boolean | ReadonlyGrain<boolean>) =>
    createDirective(
        (node: Element) => {
            const setState = (state: boolean) => {
                if (state) {
                    node.setAttribute('disabled', '');
                    return;
                }

                node.removeAttribute('disabled');
            };

            const initialState = typeof input === 'boolean' ? input : input();
            setState(initialState);

            if (typeof input === 'function') {
                input.subscribe((state) => setState(state));
            }
        },
        { nodeType: 'Element' },
    );
