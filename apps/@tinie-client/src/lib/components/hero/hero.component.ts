/** @format */

import { ReadonlyGrain, createComponent } from '@grainular/nord';
import background from '../../../assets/images/hero.webp';
import { shrinkHero } from '../../directives/shrink-hero.directive';

export const Hero = createComponent<{ listEmpty: ReadonlyGrain<boolean> }>((html, { listEmpty, $children }) => {
    return html`<div class="hero relative bg-zinc-950 w-full py-16" ${shrinkHero('h-screen', listEmpty)}>
        <img class="absolute object-cover w-full h-full object-top" src="${background}" />
        ${$children}
    </div>`;
});

Hero.setStyle((css) => {
    return css`
        .hero {
            display: grid;
            grid-template-rows: 35vh 25vh;
            min-height: calc(100vih - 8rem);
        }
    `;
});
