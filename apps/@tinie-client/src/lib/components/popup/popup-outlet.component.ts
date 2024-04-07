/** @format */

import { createComponent, when } from '@grainular/nord';
import { popupService } from '../../services/popup.service';
import { Button } from '../ui/button/button.component';
import { clickOutside } from '../../directives/click-outside.directive';

export const PopupOutlet = createComponent((html) => {
    return html`<div id="popup-outlet">
        ${when(popupService.isOpen).then(
            html`<div class="fixed inset-0 bg-zinc-900 bg-opacity-90 grid place-items-center z-30 p-4">
                <div
                    ${clickOutside(() => popupService.close())}
                    class="bg-zinc-900 border-2 border-zinc-700 px-4 py-2 max-w-xl min-w-80 rounded-lg"
                >
                    <!-- Content -->
                    <div id="popup-content" class="flex flex-col"></div>
                    <!-- Controls -->
                    <div class="border-t border-zinc-700 pt-2 mt-2">
                        ${Button({
                            label: 'Close',
                            classes:
                                'text-zinc-200 hover:bg-sky-600 w-full text-center rounded-lg bg-zinc-800 py-2 px-5',
                            onClick: () => popupService.close(false),
                        })}
                    </div>
                </div>
            </div>`,
        )}
    </div>`;
});
