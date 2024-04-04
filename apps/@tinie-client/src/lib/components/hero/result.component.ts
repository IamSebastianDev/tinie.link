/** @format */

import { createComponent } from '@grainular/nord';
import { UrlModel } from '@tinie/models';
import { Button } from '../ui/button/button.component';
import copy from '../../../assets/images/copy.svg';

export const Result = createComponent<{ url: UrlModel }>((html, { url }) => {
    const copyEntry = async () => {
        // Copy value to clipboard
        try {
            await navigator.clipboard.writeText(`https://tinie.link/${url.short_url}`);
        } catch (e) {
            console.log(e);
        }
    };

    return html`<div class="text-zinc-200 w-full flex flex-col p-3 gap-4">
        <div>Success! Copy your shortened URL below.</div>
        <div
            class="bg-zinc-300 border border-zinc-700 text-zinc-800 py-1 pl-3 pr-1 rounded-lg flex justify-between items-center"
        >
            <span>https://tinie.link/${url.short_url}</span>
            ${Button(
                { onClick: () => copyEntry() },
                (html) =>
                    html`<div class="rounded-lg bg-sky-800  flex-shrink-0 p-2 group-hover:bg-sky-600">
                        <img src="${copy}" class="w-4 h-4" />
                    </div>`,
            )}
        </div>
        <div class="text-zinc-400 text-sm">
            The created URL will only be saved in your browser, once you forget or delete it, there is no way to
            retrieve it. Make sure to write it down or save it somewhere.
        </div>
    </div>`;
});
