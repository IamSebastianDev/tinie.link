/** @format */

import { createComponent } from '@grainular/nord';
import background from '../../../assets/images/hero.webp';
import { Input } from './input.component';
import { fetchShortUrlService } from '../../services/fetch-short-url.service';
import { shrinkHero } from '../../directives/shrink-hero.directive';

export const Hero = createComponent((html) => {
    const onSubmit = (short: string) => {
        fetchShortUrlService.fetchShortUrl(short).subscribe((result) => {
            if (!!result) {
                console.log({ result });
            }
        }, false);
    };

    return html`<div class="hero relative bg-zinc-950 w-full py-16" ${shrinkHero('h-screen')}>
        <img class="absolute object-cover w-full h-full object-top" src="${background}" />
        <!-- Heading -->
        <div
            class="self-center z-10 flex flex-col justify-center items-center max-w-7xl w-full m-auto text-center px-10 max-xl:max-w-4xl gap-5"
        >
            <h1
                class="font-bold py-4 text-7xl max-xl:text-5xl bg-gradient-to-r from-red-600 via-amber-400 to-red-600 inline-block text-transparent bg-clip-text"
            >
                Life is Too Short for Long Links
            </h1>
            <h3 class="text-zinc-200 tracking-wider text-lg max-xl:text-sm font-semibold font-quicksand">
                🚀 Tinie will turbocharge your linking experience - effortless, free, and privacy-first
            </h3>
        </div>
        <!-- Input -->
        <div class="z-10 self-center">${Input({ onSubmit })}</div>
    </div>`;
});

Hero.setStyle((css) => {
    return css`
        .hero {
            display: grid;
            grid-template-rows: 35vh 25vh;
        }
    `;
});
