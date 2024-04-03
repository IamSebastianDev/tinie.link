/** @format */

import { createComponent } from '@grainular/nord';
import background from '../../../assets/images/hero.webp';

export const Hero = createComponent((html) => {
    return html`<div class="relative h-screen bg-zinc-950 grid grid-rows-2 w-full pt-16">
        <img class="absolute object-cover w-full h-full object-top" src="${background}" />
        <!-- Heading -->
        <div class="z-10 flex flex-col justify-center items-center gap-4 max-w-4xl w-full m-auto text-center">
            <h1
                class="leading-normal font-bold text-5xl bg-gradient-to-r from-red-600 via-amber-400 to-red-600 inline-block text-transparent bg-clip-text"
            >
                Life is Too Short for Long Links
            </h1>
            <h3 class="text-zinc-200 tracking-wider text-sm font-semibold px-10">
                🚀 Elevate your links with Tinie: Quick, free, and secure - where privacy meets speed
            </h3>
        </div>
        <!-- Input -->
        <div class="z-10"></div>
    </div>`;
});
