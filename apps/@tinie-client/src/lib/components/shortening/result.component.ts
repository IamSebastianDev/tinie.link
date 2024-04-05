/** @format */

import { createComponent } from '@grainular/nord';
import { UrlModel } from '@tinie/models';
import { Button } from '../ui-changed/button/button.component';
import copy from '../../../assets/images/copy.svg';
import { environment } from '../../../pages/env';

export const Result = createComponent<{ url: UrlModel }>((html, { url }) => {
    const copyEntry = async () => {
        // Copy value to clipboard
        try {
            await navigator.clipboard.writeText(`${environment.base_url}/${url.short_url}`);
        } catch (e) {
            console.log(e);
        }
    };

    return html`<div class="text-zinc-200 max-w-lg flex flex-col py-3 gap-6">
        <div>Success! You can copy your created URL below 🫶</div>
        <div
            class="bg-zinc-300 border border-zinc-700 text-zinc-800 py-1 pl-3 pr-1 rounded-lg flex justify-between items-center max-md:text-sm"
        >
            <span>${environment.base_url}/${url.short_url}</span>
            ${Button(
                {
                    onClick: () => copyEntry(),
                    classes: 'rounded-lg bg-sky-800 flex-shrink-0 p-2 hover:bg-sky-600 text-zinc-300 active:bg-sky-400',
                },
                (html) => html`
                    Copy
                    <img src="${copy}" class="w-4 h-4" />
                `,
            )}
        </div>
        <div class="text-zinc-400 text-sm">
            The created URL will only be saved in your browser, once you forget or delete it, there is no way for you to
            find it again. Make sure to write it down or save it somewhere else.
        </div>
    </div>`;
});
