/** @format */

import { createComponent, each } from '@grainular/nord';
import { toastMessageService } from '../../services/toast-message.service';
import { ToastMessage } from './toast-message.component';

export const ToastOutlet = createComponent((html) => {
    return html`<div class="fixed flex flex-col-reverse bottom-0 right-0 m-6 gap-2 z-40">
        ${each(toastMessageService.messages).as((message) => html`${ToastMessage(message)}`)}
    </div>`;
});
