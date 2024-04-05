/** @format */

import { createComponent } from '@grainular/nord';
import { Button } from '../ui/button/button.component';
import trash from '../../../assets/images/trash.svg';

import { popupService } from '../popup/popup.service';

export const Confirm = createComponent((html) => {
    return html`<div class="text-zinc-200 max-w-lg flex flex-col py-3 pb-0 gap-3">
        <div>Are you sure you want to delete this entry?</div>
        <div class="text-zinc-400 text-sm">
            The created URL is only be saved in your browser, once you forget or delete it, there is no way for you to
            find it again. The URL itself will also not be deleted. Just forgotten probably.
        </div>
        ${Button(
            {
                classes: 'text-zinc-200 hover:bg-red-600 w-full text-center rounded-lg bg-zinc-800 py-2 px-5',
                onClick: () => popupService.close(true),
            },
            (html) => html`Delete <img class="w-4 h-4" src="${trash}" />`,
        )}
    </div>`;
});
