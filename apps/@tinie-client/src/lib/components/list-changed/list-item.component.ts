/** @format */

import { createComponent } from '@grainular/nord';
import { UrlModel } from '@tinie/models';
import external from '../../../assets/images/external.svg';
import copy from '../../../assets/images/copy.svg';
import remove from '../../../assets/images/delete.svg';
import { Link } from '../ui-changed/link/link.component';
import { urlList } from '../../grains/url-list.grain';
import { Button } from '../ui-changed/button/button.component';
import { environment } from '../../../pages/env';
import { popupService } from '../../services/popup.service';
import { Confirm } from './confirm.component';

export const ListItem = createComponent<{ entry: UrlModel }>((html, { entry }) => {
    const deleteEntry = () => {
        popupService.open(Confirm, {}).result.subscribe((result) => {
            if (!!result) {
                urlList.update((list) => [...list.filter(({ short_url }) => short_url !== entry.short_url)]);
            }
        });
    };

    const copyEntry = async () => {
        // Copy value to clipboard
        try {
            await navigator.clipboard.writeText(`${environment.base_url}/${entry.short_url}`);
        } catch (e) {
            console.log(e);
        }
    };

    return html`<div
        class="grid grid-cols-9 text-zinc-200 font-sans font-light text-sm bg-zinc-900 px-4 py-3 place-items-start bg-opacity-70 gap-4 items-center border border-zinc-900"
    >
        <!-- Destination -->
        <div class="col-span-3 max-md:hidden">
            ${Link(
                { label: entry.long_url, href: entry.long_url, target: '_blank', classes: 'flex-row-reverse' },
                (html) => html`<img class="w-4 h-4" src="${external}" />`,
            )}
        </div>
        <!-- Short -->
        <div class="col-span-3 max-md:col-span-6">
            ${Link(
                {
                    label: `${environment.base_url}/${entry.short_url}`,
                    href: `${environment.base_url}/${entry.short_url}`,
                    classes: 'flex-row-reverse',
                },
                (html) => html`<img class="w-4 h-4" src="${external}" />`,
            )}
        </div>
        <!-- Timestamp -->
        <div class="col-span-2 max-md:hidden">${new Date(entry.created_at).toLocaleString()}</div>
        <!-- Actions -->
        <div class="flex w-full justify-center gap-3 max-md:col-span-3">
            ${Button(
                { onClick: () => copyEntry() },
                (html) =>
                    html`<div
                        class="rounded-full bg-zinc-700 bg-opacity-20 flex-shrink-0 p-2 group-hover:bg-sky-600 group-active:bg-emerald-600"
                    >
                        <img src="${copy}" class="w-5 h-5" />
                    </div>`,
            )}
            ${Button(
                { onClick: () => deleteEntry() },
                (html) =>
                    html`<div class="rounded-full bg-zinc-700 bg-opacity-20 flex-shrink-0 p-2 group-hover:bg-red-600">
                        <img src="${remove}" class="w-5 h-5" />
                    </div>`,
            )}
        </div>
    </div>`;
});
