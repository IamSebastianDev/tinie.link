/** @format */

import { createComponent } from '@grainular/nord';
import { UrlModel } from '@tinie/models';
import external from '../../../assets/images/external.svg';
import copy from '../../../assets/images/copy.svg';
import remove from '../../../assets/images/delete.svg';
import { Link } from '../ui/link/link.component';
import { urlList } from '../../grains/url-list.grain';
import { Button } from '../ui/button/button.component';
import { environment } from '../../../pages/env';
import { popupService } from '../../services/popup.service';
import { Confirm } from './confirm.component';
import { toastMessageService } from '../../services/toast-message.service';

export const ListItem = createComponent<{ entry: UrlModel }>((html, { entry }) => {
    const deleteEntry = () => {
        popupService
            .open(Confirm, {
                heading: 'Are you sure you want to delete this entry?',
                text: 'The created URL is only be saved in your browser, once you forget or delete it, there is no way for you to find it again. The URL itself will also not be deleted. Just forgotten probably.',
            })
            .result.subscribe((result) => {
                if (!!result) {
                    urlList.update((list) => [...list.filter(({ short_url }) => short_url !== entry.short_url)]);
                    toastMessageService.dispatch({ type: 'SUCCESS', content: `Deleted successfully` });
                }
            });
    };

    const copyEntry = async () => {
        // Copy value to clipboard
        try {
            await navigator.clipboard.writeText(`${environment.base_url}/${entry.short_url}`);
            toastMessageService.dispatch({ type: 'SUCCESS', content: 'Copied successfully to clipboard 🥳' }, 1500);
        } catch (e) {
            console.log(e);
        }
    };

    return html`<div
        key="${entry.short_url}"
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
