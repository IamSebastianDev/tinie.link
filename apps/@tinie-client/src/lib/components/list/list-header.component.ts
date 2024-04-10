/** @format */

import { createComponent, derived, on } from '@grainular/nord';
import { Button } from '../ui/button/button.component';
import { urlList } from '../../grains/url-list.grain';
import { popupService } from '../../services/popup.service';
import { toastMessageService } from '../../services/toast-message.service';
import { Confirm } from './confirm.component';
import chevronUp from '../../../assets/images/chevron-up.svg';
import chevronDown from '../../../assets/images/chevron-down.svg';
import { sortDirection } from '../../grains/sort-direction.grain';

export const ListHeader = createComponent((html) => {
    const handleDeleteAllClick = () => {
        popupService
            .open(Confirm, {
                heading: 'Are you sure you want to delete all your saved URLs?',
                text: 'They are only saved in your browser, once you forget or delete them, there is no way for you to find them again. The URLs itself will also not be deleted. Just forgotten probably.',
            })
            .result.subscribe((result) => {
                if (!!result) {
                    urlList.set([]);
                    toastMessageService.dispatch({ type: 'SUCCESS', content: `Deleted all entries Successfully` });
                }
            });
    };

    const sortIcon = derived(sortDirection, (dir) => ({ '-1': chevronUp, 1: chevronDown })[dir]);
    const handleSortClick = () => {
        sortDirection.update((dir) => (dir === -1 ? 1 : -1));
    };

    return html`<div
        class="grid grid-cols-9 text-zinc-200 font-black text-sm bg-zinc-900 px-4 py-5 place-items-start bg-opacity-50 gap-4 items-center rounded-t-xl border border-zinc-900"
    >
        <!-- Destination -->
        <div class="col-span-3 max-md:hidden">Original URL</div>
        <!-- Short -->
        <div class="col-span-3 max-md:col-span-7">Short Url</div>
        <!-- Timestamp -->
        <button
            ${on('click', () => handleSortClick())}
            class="col-span-2 max-md:hidden flex gap-2 justify-center items-center"
        >
            Date <img class="w-3 h-3" src="${sortIcon}" />
        </button>
        <!-- Delete all -->
        <div class="col-span-1 justify-self-center relative grid place-items-center ml-auto">
            ${Button({
                label: 'Delete all',
                onClick: () => handleDeleteAllClick(),
                classes:
                    'font-light text-sm hover:bg-red-700 px-2.5 py-1.5 rounded-lg absolute whitespace-nowrap text-zinc-500 hover:text-zinc-200',
            })}
        </div>
    </div>`;
});
