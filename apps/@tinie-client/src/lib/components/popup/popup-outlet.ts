/** @format */

import { createComponent, when } from '@grainular/nord';
import { popupService } from './popup.service';
import { Button } from '../ui/button/button.component';
import close from '../../../assets/images/delete.svg';

export const PopupOutlet = createComponent((html) => {
    return html`<div id="popup-outlet">
        ${when(popupService.popup, (v) => !!v).then(
            html`<div class="fixed inset-0 bg-zinc-900 bg-opacity-90 grid place-items-center z-30">
                <div
                    class="relative bg-zinc-900 border border-zinc-700 p-5 w-[50vw] min-w-64 rounded-lg"
                    id="popup-content"
                ></div>
            </div>`,
        )}
    </div>`;
});
