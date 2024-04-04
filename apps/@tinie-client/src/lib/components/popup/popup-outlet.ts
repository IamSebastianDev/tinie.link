/** @format */

import { createComponent, when } from '@grainular/nord';
import { popupService } from './popup.service';

export const PopupOutlet = createComponent((html) => {
    return html`<div id="popup-outlet">
        ${when(popupService.popup, (v) => !!v).then(
            html`<!-- Overlay -->
                <div class="fixed inset-0 bg-zinc-800 bg-opacity-50 grid place-items-center z-30">
                    <!-- Content -->
                    <div class="bg-zinc-900 border border-zinc-700" id="popup-inner"></div>
                </div>`,
        )}
    </div>`;
});
