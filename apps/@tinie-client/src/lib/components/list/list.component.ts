/** @format */

import { createComponent, each, when } from '@grainular/nord';
import { ListHeader } from './list-header.component';
import { urlList } from '../../grains/url-list.grain';
import { ListItem } from './list-item.component';
import { listEmpty } from '../../grains/list-empty.grain';

export const List = createComponent((html) => {
    return html`<div class="w-full bg-zinc-950 text-zinc-200 bg-hero-topography border-t-4 border-amber-600">
        ${when(listEmpty, (v) => !v)
            // Show url entries in List
            .then(
                html`<div class="px-4 max-w-5xl w-full m-auto flex flex-col gap-1 max-h-screen py-12">
                    <!-- List header -->
                    <div class="w-full m-auto">${ListHeader({})}</div>
                    <!-- List Rendering -->
                    <div class="w-full m-auto flex flex-col gap-1 overflow-auto">
                        ${each(urlList).as((entry) => html`${ListItem({ entry })}`)}
                    </div>
                    <div class="bg-zinc-900 px-4 py-2 bg-opacity-50  rounded-b-xl border border-zinc-900"></div>
                </div>`,
            )}
    </div>`;
});
