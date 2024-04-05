/** @format */

import { createComponent, when } from '@grainular/nord';
import { popupService } from './popup.service';
import { Button } from '../ui/button/button.component';

export const PopupOutlet = createComponent((html) => {
    return html`<div id="popup-outlet">
        ${when(popupService.popup, (v) => !!v).then(
            html`<div class="fixed inset-0 bg-zinc-900 bg-opacity-90 grid place-items-center z-30">
                <div class="relative bg-zinc-900 border-2 border-zinc-700 px-2 w-[30vw] min-w-80 rounded-lg">
                    <!-- Content -->
                    <div id="popup-content" class="flex flex-col"></div>
                    <!-- Controls -->
                    <div class="flex gap-2 justify-end border-t border-zinc-700 px-3 py-2 pt-1.5 mt-2">
                        ${Button({
                            label: 'Close',
                            classes: 'text-zinc-300 hover:text-amber-600',
                            onClick: () => popupService.close(),
                        })}
                    </div>
                </div>
            </div>`,
        )}
    </div>`;
});
