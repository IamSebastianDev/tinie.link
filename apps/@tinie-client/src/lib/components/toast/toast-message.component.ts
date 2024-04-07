/** @format */

import { createComponent } from '@grainular/nord';
import { ToastMessageProps } from './toast-message.props';
import { Button } from '../ui/button/button.component';
import x from '../../../assets/images/delete.svg';

export const ToastMessage = createComponent<ToastMessageProps>((html, { close, content, type }) => {
    const cls = type === 'ERROR' ? 'border-red-700' : type === 'SUCCESS' ? 'border-emerald-700' : '';

    return html`<div
        class="${cls} border px-4 py-3 rounded-md flex gap-2 text-sm bg-zinc-900 text-zinc-200 justify-center items-center"
    >
        <span>${content}</span>
        ${Button(
            { onClick: () => close() },
            (html) => html`<div class="p-1 bg-zinc-800 rounded-full"><img src="${x}" class="w-4 h-4" /></div>`,
        )}
    </div>`;
});
