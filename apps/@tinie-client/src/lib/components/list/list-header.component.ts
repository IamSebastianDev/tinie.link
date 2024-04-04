/** @format */

import { createComponent } from '@grainular/nord';

export const ListHeader = createComponent((html) => {
    return html`<div
        class="grid grid-cols-9 text-zinc-200 font-black text-sm bg-zinc-900 px-4 py-5 place-items-start bg-opacity-50 gap-4 items-center rounded-t-xl border border-zinc-900"
    >
        <!-- Destination -->
        <div class="col-span-3">Original URL</div>
        <!-- Short -->
        <div class="col-span-3">Short Url</div>
        <!-- Timestamp -->
        <div class="col-span-3">Date</div>
    </div>`;
});
