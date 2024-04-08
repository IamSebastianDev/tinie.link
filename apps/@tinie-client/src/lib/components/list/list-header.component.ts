/** @format */

import { createComponent } from '@grainular/nord';
import { Button } from '../ui/button/button.component';
import { urlList } from '../../grains/url-list.grain';
import { popupService } from '../../services/popup.service';
import { toastMessageService } from '../../services/toast-message.service';
import { Confirm } from './confirm.component';

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

    return html`<div
        class="grid grid-cols-9 text-zinc-200 font-black text-sm bg-zinc-900 px-4 py-5 place-items-start bg-opacity-50 gap-4 items-center rounded-t-xl border border-zinc-900"
    >
        <!-- Destination -->
        <div class="col-span-3 max-md:hidden">Original URL</div>
        <!-- Short -->
        <div class="col-span-3">Short Url</div>
        <!-- Timestamp -->
        <div class="col-span-2 max-md:hidden">Date</div>
        <!-- Delete all -->
        <div class="col-span-1 justify-self-center relative grid place-items-center">
            ${Button({
                label: 'Delete all',
                onClick: () => handleDeleteAllClick(),
                classes:
                    'font-light text-sm hover:bg-red-700 px-2.5 py-1.5 rounded-lg absolute whitespace-nowrap text-zinc-500 hover:text-zinc-200',
            })}
        </div>
    </div>`;
});
