/** @format */

import { createComponent } from '@grainular/nord';
import background from '../../../assets/images/hero.webp';

export const Hero = createComponent((html) => {
    return html`<div class="h-screen bg-gray-200 dark:bg-gray-900 grid-rows-3 w-full grid">
        <img class="absolute object-cover w-full h-full object-top" src="${background}" />
    </div>`;
});
