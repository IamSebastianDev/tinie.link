/** @format */

import { createComponent } from '@grainular/nord';

export const Hero = createComponent((html) => {
    return html`<div class="h-screen bg-zinc-900 grid-rows-3 w-full grid">
        <img class="absolute object-cover w-full h-full" src="https://picsum.photos/1600/1200" />
    </div>`;
});
