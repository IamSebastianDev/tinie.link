/** @format */

import { createComponent } from '@grainular/nord';
import { Button } from '../ui/button/button.component';
import trash from '../../../assets/images/trash.svg';
import { popupService } from '../../services/popup.service';
import { ConfirmProps } from './confirm.props';

export const Confirm = createComponent<ConfirmProps>((html, { heading, text }) => {
    return html`<div class="text-zinc-200 max-w-lg flex flex-col py-3 pb-0 gap-3">
        <div>${heading}</div>
        <div class="text-zinc-400 text-sm">${text}</div>
        ${Button(
            {
                classes: 'text-zinc-200 hover:bg-red-600 w-full text-center rounded-lg bg-zinc-800 py-2 px-5',
                onClick: () => popupService.close(true),
            },
            (html) => html`Delete <img class="w-4 h-4" src="${trash}" />`,
        )}
    </div>`;
});
